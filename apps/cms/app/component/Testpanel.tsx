// app/component/TestPanel.tsx
"use client";

import { useMemo, useState } from "react";
import { Prisma } from "@prisma/client";
import { formatTestCase } from "@/lib/formatTestCase";
import { useProblem } from "../context/problemContext";

export interface TestCaseResult {
  id: string;
  label: string;
  input: string;
  expected: string;
  actual?: string;
  status?: "passed" | "failed" | "error";
  errorMessage?: string;
  stderr?: string;
  runtimeMs?: number;
}

interface TestPanelProps {
  testCases: { id: string; label: string; input: Prisma.JsonValue; expected: Prisma.JsonValue }[];
  isRunning?: boolean;
}

export default function TestPanel({ testCases, isRunning }: TestPanelProps) {
  const { testResults } = useProblem();

  const [tab, setTab] = useState<"testcase" | "result">("testcase");
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);     
  const [activeResultIdx, setActiveResultIdx] = useState(0); 
  const [prevResults, setPrevResults] = useState(testResults);

  const hasResults = (testResults?.length ?? 0) > 0;

  const activeResult = useMemo(
    () => testResults?.[activeResultIdx],
    [testResults, activeResultIdx]
  );

  const activeCase = useMemo(
    () => testCases[activeCaseIdx],
    [testCases, activeCaseIdx]
  );

  const overallStatus = useMemo(() => {
    if (!hasResults) return null;

    return testResults!.every((r) => r.status === "passed")
      ? "passed"
      : "failed";
  }, [testResults, hasResults]);

  
  if (testResults !== prevResults) {
    setPrevResults(testResults);
    if (testResults?.length) {
      setTab("result");
      setActiveResultIdx(0);
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-card">
      {/* Tab bar */}
      <div className="flex shrink-0 items-center gap-5 border-b border-border px-4 text-sm">
        <button
          onClick={() => setTab("testcase")}
          className={`flex items-center gap-1.5 border-b-2 py-2.5 transition-colors ${
            tab === "testcase"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <CheckIcon className="h-3.5 w-3.5" />
          Testcase
        </button>
        <span className="text-border">|</span>
        <button
          onClick={() => setTab("result")}
          className={`flex items-center gap-1.5 border-b-2 py-2.5 transition-colors ${
            tab === "result"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <TerminalIcon className="h-3.5 w-3.5" />
          Test Result
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {tab === "testcase" && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {testCases.map((tc, i) => (
                <button
                  key={tc.id}
                  onClick={() => setActiveCaseIdx(i)}
                  className={`rounded-md border px-3 py-1 text-xs font-medium transition-all ${
                    activeCaseIdx === i
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-secondary text-secondary-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {tc.label}
                </button>
              ))}
            </div>

            {activeCase && (
              <div className="flex flex-col gap-3 text-sm">
                <div>
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">
                    Input
                  </p>
                  <pre className="rounded-md bg-background px-3 py-2 font-mono text-xs text-foreground">
                    {formatTestCase(activeCase.input)}
                  </pre>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">
                    Expected
                  </p>
                  <pre className="rounded-md bg-background px-3 py-2 font-mono text-xs text-foreground">
                    {formatTestCase(activeCase.expected)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "result" && (
          <div className="flex h-full flex-col">
            {isRunning && (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">Running...</p>
              </div>
            )}

            {!isRunning && !hasResults && (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  You must run your code first
                </p>
              </div>
            )}

            {!isRunning && hasResults && (
              <div className="flex flex-col gap-4">
                {/* Overall banner */}
                <div className="flex items-center gap-2">
                  {overallStatus === "passed" ? (
                    <span className="flex items-center gap-2 text-base font-semibold text-green-500">
                      <CheckIcon className="h-5 w-5" />
                      Accepted
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-base font-semibold text-red-500">
                      <XIcon className="h-5 w-5" />
                      Wrong Answer
                    </span>
                  )}
                </div>

                {/* Per-case tabs */}
                <div className="flex flex-wrap gap-2">
                  {testResults!.map((r, i) => (
                    <button
                      key={r.id}
                      onClick={() => setActiveResultIdx(i)}
                      className={`flex items-center gap-1.5 rounded-md border px-3 py-1 text-xs font-medium transition-all ${
                        activeResultIdx === i
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary text-secondary-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          r.status === "passed"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      {r.label}
                    </button>
                  ))}
                </div>

                {activeResult && (
                  <div className="flex flex-col gap-3 text-sm">
                    <div>
                      <p className="mb-1 text-xs font-semibold text-muted-foreground">
                        Input
                      </p>
                      <pre className="rounded-md bg-background px-3 py-2 font-mono text-xs text-foreground">
                        {activeResult.input}
                      </pre>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="mb-1 text-xs font-semibold text-muted-foreground">
                          Output
                        </p>
                        <pre
                          className={`rounded-md bg-background px-3 py-2 font-mono text-xs ${
                            activeResult.status === "passed"
                              ? "text-foreground"
                              : "text-red-400"
                          }`}
                        >
                          {activeResult.actual ?? "—"}
                        </pre>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-semibold text-muted-foreground">
                          Expected
                        </p>
                        <pre className="rounded-md bg-background px-3 py-2 font-mono text-xs text-foreground">
                          {activeResult.expected}
                        </pre>
                      </div>
                    </div>

                    {/* Compile / runtime error block */}
                    {activeResult.status === "error" && (
                      <div>
                        <p className="mb-1 text-xs font-semibold text-red-400">
                          Runtime Error
                        </p>
                        <pre className="whitespace-pre-wrap rounded-md border border-red-500/30 bg-red-500/5 px-3 py-2 font-mono text-xs text-red-300">
                          {activeResult.errorMessage}
                        </pre>
                      </div>
                    )}

                    {activeResult.stderr && (
                      <div>
                        <p className="mb-1 text-xs font-semibold text-muted-foreground">
                          stderr
                        </p>
                        <pre className="whitespace-pre-wrap rounded-md bg-background px-3 py-2 font-mono text-xs text-yellow-400">
                          {activeResult.stderr}
                        </pre>
                      </div>
                    )}

                    {activeResult.runtimeMs !== undefined && (
                      <p className="text-xs text-muted-foreground">
                        Runtime: {activeResult.runtimeMs} ms
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TerminalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3M13 15h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}