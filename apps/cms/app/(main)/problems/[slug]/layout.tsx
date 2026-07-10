// app/(main)/problems/[slug]/layout.tsx
import CodeEditor from "@/app/component/CodeEditor";
import { ProblemProvider } from "@/app/context/problemContext";
import React from "react";
import { prisma } from "@/lib/prisma";
import HeaderActions from "@/app/component/HeaderAction";

import { ProblemWithRelations } from "@/app/types/problemType";
import {
  generateStarterCode,
  ProblemSignature,
  SignatureParameter,
  TypeNode,
} from "@/lib/judge/starterCode";
import { redis } from "@/lib/redis";
import TestPanel from "@/app/component/Testpanel";
import { Prisma } from "@prisma/client";

interface Signature {
  id: string;
  problemId: string;
  functionName: string;
  returnType: Prisma.JsonValue;
  parameters: Prisma.JsonValue;
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const difficultyStyles: Record<string, string> = {
  Easy: "bg-green-500/10 text-green-500 border-green-500/20",
  Medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  Hard: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default async function ProblemLayout({ children, params }: LayoutProps) {
  const { slug } = await params;

  const problem: ProblemWithRelations | null = await prisma.problem.findUnique({
    where: { slug },
    include: {
      metaData: true,
      signature: true,
      testCases: {
        take: 2,
      },
    },
  });

  if (problem == null) {
    return;
  }

  // set the testcase in the redis so that we don't have to send it to in the websocket request
  const CACHE_TTL_SECONDS = 3600;

  const cacheKey = `problem:${problem.id}`;
  await redis.set(
    cacheKey,
    JSON.stringify({
      testCases: problem?.testCases,
      signature: problem?.signature,
    }),
    "EX",
    CACHE_TTL_SECONDS,
  );

  function normalizeSignature(
    signature: Signature,
  ): ProblemSignature | undefined {
    if (!signature) return undefined;

    return {
      id: signature.id,
      problemId: signature.problemId,
      functionName: signature.functionName,
      returnType: signature.returnType as TypeNode,
      parameters: signature.parameters as unknown as SignatureParameter[],
    };
  }

  const starterCodes = {
    cpp: generateStarterCode(normalizeSignature(problem?.signature!), "cpp"),
    java: generateStarterCode(normalizeSignature(problem?.signature!), "java"),
    javascript: generateStarterCode(
      normalizeSignature(problem?.signature!),
      "javascript",
    ),
    python: generateStarterCode(
      normalizeSignature(problem?.signature!),
      "javascript",
    ),
  };

  if (!problem) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm text-muted-foreground">Problem not found.</p>
      </div>
    );
  }

  const diffClass =
    difficultyStyles[problem.difficulty] ??
    "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  const testCases =
    problem?.testCases.map((tc, i) => ({
      id: tc.id,
      label: `Case ${i + 1}`,
      input: tc.input ?? "",
      expected: tc.expected ?? "",
    })) ?? [];

  return (
    <ProblemProvider
      initialProblem={problem}
      starterCode={starterCodes}
      testCases={problem?.testCases}
    >
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground">
        {/* Top Bar */}
        <header className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-bold tracking-tight text-primary">
              {"</>"}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {problem.title}
            </span>
            <span
              className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${diffClass}`}
            >
              {problem.difficulty}
            </span>
          </div>

          <HeaderActions />
        </header>

        {/* Split Pane */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel */}
          <div className="flex w-1/2 flex-col overflow-hidden">
            <div className="shrink-0 border-b border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <span className="border-b-2 border-primary pb-2 text-primary">
                Description
              </span>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 text-sm leading-relaxed text-foreground/90">
              {children}
            </div>
          </div>

          {/* Divider */}
          <div className="group relative w-px shrink-0 cursor-col-resize bg-border transition-colors">
            <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-primary/40" />
          </div>

          {/* Right Panel */}
          <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr_4px_minmax(0,40%)] overflow-hidden">
            {/* Code header */}
            <div className="shrink-0 border-b border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <span className="border-b-2 border-primary pb-2 text-primary">
                Code
              </span>
            </div>

            {/* Editor */}
            <div className="min-h-0 overflow-hidden bg-background">
              <CodeEditor />
            </div>

            {/* Horizontal resize handle */}
            <div className="group relative h-1 shrink-0 cursor-row-resize bg-border transition-colors">
              <div className="absolute inset-x-0 -top-1 -bottom-1 group-hover:bg-primary/40" />
            </div>

            {/* Test panel (tabs: Testcase / Test Result) */}
            <div className="min-h-0 overflow-hidden border-t border-border">
              <TestPanel testCases={testCases} />
            </div>
          </div>
        </div>
      </div>
    </ProblemProvider>
  );
}
