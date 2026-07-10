"use client";
import { useProblem } from "@/app/context/problemContext";

export default function HeaderActions() {
  const { runCode, isCompiling } = useProblem();




  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={runCode} 
        disabled={isCompiling}
        className="text-sm px-3 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-muted border border-border disabled:opacity-50 transition-all"
      >
        {isCompiling ? "⏳ Running..." : "▶ Run"}
      </button>
      <button className="text-sm px-3 py-1 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
        Submit
      </button>
    </div>
  );
}