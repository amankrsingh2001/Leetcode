"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ProblemWithRelations, TestCase } from "@/app/types/problemType";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { Language } from "@/lib/judge/starterCode";
import { TestCaseResult } from "../component/Testpanel";



interface ProblemContextType {
  problem: ProblemWithRelations;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  codes: Record<Language, string>;
  setCodes: React.Dispatch<React.SetStateAction<Record<Language, string>>>;
  output: string;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  isCompiling: boolean;
  testResults: TestCaseResult[] | undefined;
  runCode: () => void;
  submitCode: () => void;
}

export interface JudgeSubmissionResult {
  token: string;
  source_code: string;
  language_id: number;
  stdin: string;
  label?:string
  expected_output: string | null;
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
  created_at: string;
  finished_at: string;
  time: string;
  wall_time: string;
  memory: number | null;
  exit_code: number | null;
  exit_signal: number | null;

  id: string;
  input: Record<string, unknown>;
  expected: string;
}

export interface RawJudgeResult {
  id: string;
  label: string;
  input: Record<string, unknown>;
  expected?: string;

  token: string;
  source_code: string;
  language_id: number;
  stdin: string;
  expected_output: string | null;
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
  created_at: string;
  finished_at: string;
  time: string;
  wall_time: string;
  memory: number | null;
  exit_code: number | null;
  exit_signal: number | null;
}

const ProblemContext = createContext<ProblemContextType | null>(null);

export function ProblemProvider({children, initialProblem, starterCode, testCases}: {
  children: ReactNode;
  initialProblem: ProblemWithRelations;
  starterCode: Record<Language, string>;
  testCases: TestCase[];
}) {
  const socketRef = useRef<WebSocket | null>(null);
  const [language, setLanguage] = useState<Language>("cpp");
  const [codes, setCodes] = useState<Record<Language, string>>(starterCode);

  const [output, setOutput] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [testResults, setTestResults] = useState<TestCaseResult[]>();

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    async function initializeSecureSocket() {
      try {
        const res = await api.get("/ws-ticket", { signal: abortController?.signal });
        if (!res?.data?.success) {
          throw new Error("Could not fetch ws ticket");
        }
        const ticket = await res?.data?.ticket;

        if (!isMounted) return;

        const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}?ticket=${ticket}`;
        const ws = new WebSocket(wsUrl);
        socketRef.current = ws;

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            switch (data?.type) {
              case "RUN_RESULT": {
                const rawResults: JudgeSubmissionResult[] = Array.isArray(data.payload)
                  ? data.payload
                  : [data.payload];

                  console.log(rawResults,"This is the rawResults we are checking ")

                const mapped: TestCaseResult[] = rawResults.map((raw, idx) => {
                  const tc = testCases?.[idx];
                  const passed = raw.status?.id === 3;

                  return {
                    id: tc?.id ?? raw.id ?? String(idx),
                    label: tc?.label ?? raw.label ?? `Case ${idx + 1}`,
                    input: JSON.stringify(tc?.input ?? raw.input ?? ""),
                    expected: JSON.stringify(tc?.expected ?? raw.expected ?? ""),
                    actual:
                      raw.stdout ??
                      raw.stderr ??
                      raw.compile_output ??
                      raw.message ??
                      raw.status?.description ??
                      "No output",
                    status: passed ? "passed" : "failed",
                    stderr: raw.stderr ?? undefined,
                    runtimeMs: raw.time
                      ? Math.round(Number(raw.time) * 1000)
                      : undefined,
                  };
                });


                setTestResults(mapped);
                setOutput(
                  mapped.every((m) => m.status === "passed")
                    ? "All test cases passed"
                    : "Some test cases failed"
                );

                setIsCompiling(false);
                break;
              }
              case "SUBMIT_RESULT": {
                const rawResults: RawJudgeResult[] = Array.isArray(data.payload)
                  ? data.payload
                  : [data.payload];

                const mapped: TestCaseResult[] = rawResults.map((raw, idx) => {
                  const tc = testCases?.[idx];
                  const passed = raw.status?.id === 3;

                  return {
                    id: tc?.id ?? raw.id ?? String(idx),
                    label: tc?.label ?? raw.label ?? `Case ${idx + 1}`,
                    input: JSON.stringify(tc?.input ?? raw.input ?? ""),
                    expected: JSON.stringify(tc?.expected ?? raw.expected ?? ""),
                    actual:
                      raw.stdout ??
                      raw.stderr ??
                      raw.compile_output ??
                      raw.message ??
                      raw.status?.description ??
                      "No output",
                    status: passed ? "passed" : "failed",
                    stderr: raw.stderr ?? undefined,
                    runtimeMs: raw.time
                      ? Math.round(Number(raw.time) * 1000)
                      : undefined,
                  };
                });

                setTestResults(mapped);
                setOutput(
                  mapped.every((m) => m.status === "passed")
                    ? "All test cases passed"
                    : "Some test cases failed"
                );
                setIsCompiling(false);
                break;
              }
            }
          } catch (e) {
            console.error("Failed parsing message", e);
          }
        };

        ws.onerror = (err) => {
          console.error("WebSocket error:", err);
          setIsCompiling(false);
        };

        ws.onclose = () => {
          console.log("WebSocket connection closed.");
        };
      } catch (error) {
        if (error instanceof AxiosError) {
          if (
            error?.name === "CanceledError" ||
            error?.name === "AbortError" ||
            error?.code === "ERR_CANCELED"
          ) {
            return;
          }
          console.error("Failed to establish secure WebSocket:", error);
        }
      }
    }
    initializeSecureSocket();

    return () => {
      isMounted = false;
      abortController.abort();
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [initialProblem.id]);

  function runCode() {
    if (!socketRef.current) return;

    setOutput("");
    setTestResults(undefined);
    setIsCompiling(true);
    socketRef.current.send(
      JSON.stringify({
        type: "RUN_CODE",
        payload: {
          problemId: initialProblem.id,
          language,
          code: codes[language],
        },
      })
    );
  }

  function submitCode() {
    if (!socketRef.current) return;
    setOutput("");
    setTestResults(undefined);
    setIsCompiling(true);

    socketRef.current.send(
      JSON.stringify({
        type: "SUBMIT_CODE",
        payload: {
          problemId: initialProblem.id,
          language,
          code: '',
          signature: initialProblem.signature,
        },
      })
    );
  }

  return (
    <ProblemContext.Provider
      value={{
        problem: initialProblem,
        language,
        setLanguage,
        codes,
        setCodes,
        output,
        setOutput,
        isCompiling,
        testResults,
        runCode,
        submitCode,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
}

export function useProblem() {
  const context = useContext(ProblemContext);
  if (!context) {
    throw new Error("useProblem must be used inside ProblemProvider");
  }
  return context;
}