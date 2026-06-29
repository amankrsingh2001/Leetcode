import CodeEditor from "@/app/component/CodeEditor";
import React from "react";

export default function ProblemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 h-11 bg-card border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-primary text-base tracking-tight">
            {"</>"}
          </span>
          <span className="font-semibold text-sm text-foreground">Two Sum</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
            Easy
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm px-3 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-muted border border-border transition-colors">
            ▶ Run
          </button>
          <button className="text-sm px-3 py-1 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Submit
          </button>
        </div>
      </header>

      {/* Split Pane — fills exactly the remaining height */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Panel */}
        <div className="flex flex-col w-1/2 min-h-0 overflow-hidden">
          <div className="text-xs font-semibold uppercase tracking-widest px-4 py-2 bg-card border-b-2 border-primary text-primary shrink-0">
            Description
          </div>
          {/* min-h-0 lets flexbox shrink this below its content size, enabling inner scroll */}
          <div className="flex-1 min-h-0 overflow-y-auto p-5 leading-relaxed text-sm text-foreground">
            {children}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-border hover:bg-primary shrink-0 cursor-col-resize transition-colors" />

        {/* Right Panel */}
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="text-xs font-semibold uppercase tracking-widest px-4 py-2 bg-card border-b-2 border-primary text-primary shrink-0">
            Code
          </div>

          {/* Editor area */}
          <div className="flex-1 min-h-0 bg-background overflow-hidden">
            <CodeEditor />
          </div>

          {/* Test Cases */}
          <div className="h-28 border-t border-border bg-card px-4 py-3 shrink-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Test Cases
            </p>
            <div className="flex gap-2">
              {["Case 1", "Case 2", "Case 3"].map((c) => (
                <button
                  key={c}
                  className="text-xs px-3 py-1 rounded bg-secondary text-secondary-foreground border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>
            {/* <TestCases /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
