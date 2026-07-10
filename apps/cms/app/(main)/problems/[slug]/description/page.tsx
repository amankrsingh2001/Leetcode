"use client"; 
import { useProblem } from "@/app/context/problemContext";
import { Problem, TestCase } from "@prisma/client";
import { ProblemWithRelations } from "@/app/types/problemType";
import { formatTestCase } from "@/lib/formatTestCase";


export default function Description() {
  
  const { problem } = useProblem();


  if (!problem) {
    return <div>Not found any description for this question</div>;
  }

  const topics = problem.topic ? problem.topic.split("&") : [];
  
  
  const metaData = (problem as ProblemWithRelations)?.metaData;

  return (
    <div className="flex flex-col gap-6 text-sm text-foreground">
      {/* Problem header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground font-mono text-xs">1.</span>
          <h1 className="text-lg font-bold tracking-tight text-foreground">{problem.title}</h1>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap">
          {topics.map((topic: string, index: number) => (
            <span 
              key={`${topic}-${index}`} 
              className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20"
            >
              {topic}
            </span> 
          ))}
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
          <span>✓ <span className="text-foreground font-medium">14.2M</span> accepted</span>
          <span className="text-border">|</span>
          <span>↑ <span className="text-foreground font-medium">52.3%</span> acceptance</span>
          <span className="text-border">|</span>
          <span>Asked by <span className="text-foreground font-medium">{problem.companies?.join(", ")}</span></span>
        </div>
      </div>

      <hr className="border-border" />

      {/* Problem statement */}
      <div className="flex flex-col gap-3 leading-relaxed">
        {metaData?.description}
      </div>

      {/* Examples */}
      <div className="flex flex-col gap-4">
        {problem?.testCases?.map((ex: TestCase, id: number) => (
          <div key={ex.id} className="flex flex-col gap-2">
            <p className="font-semibold text-foreground">Example {id + 1}</p>
            <div className="rounded-lg bg-muted border border-border px-4 py-3 font-mono text-xs leading-6 text-foreground">
              <div>
                <span className="text-muted-foreground">Input: &nbsp;</span>
                {formatTestCase(ex.input)}
              </div>
              <div>
                <span className="text-muted-foreground">Output:</span> {formatTestCase(ex.expected)}
              </div>
              {ex.explanation && (
                <div>
                  <span className="text-muted-foreground">Explanation:</span> {ex.explanation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Constraints */}
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-foreground">Constraints</p>
        <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-muted-foreground text-xs font-mono text-foreground leading-6">
          {metaData?.constraints?.map((constraint: string, idx: number) => (
            <li key={`constraint-${idx}`}>{constraint}</li>
          ))}
        </ul>
      </div>

      {/* Follow-up */}
      <div className="rounded-lg border border-border bg-card px-4 py-3 text-xs text-muted-foreground leading-relaxed">
        <span className="font-semibold text-foreground">Follow-up: </span>
        Can you come up with an algorithm that is less than{" "}
        <span className="font-mono text-foreground">O(n²)</span> time complexity?
      </div>
    </div>
  );
}