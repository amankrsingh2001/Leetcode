"use server"

import { prisma } from "@/lib/prisma";
import { Problem, TestCases } from "@prisma/client";



export default async function Description({params}:{ params: Promise<{ slug: string }>;}) {

     const { slug } = await params;

    const problemDetails = await prisma.problem.findUnique({
        where:{
            slug
        },include:{
                metaData:{
                    include:{
                        testCases:true
                    }
                }
            }
    })
    if(problemDetails === null){
        return <div>Not found any description for this question</div>
    }
  const topics = problemDetails?.topic.split("&");
  return (
    <div className="flex flex-col gap-6 text-sm text-foreground">

      {/* Problem header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground font-mono text-xs">1.</span>
          <h1 className="text-lg font-bold tracking-tight text-foreground">{problemDetails?.title}</h1>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap">
          {
            topics.map((topic:string)=>{
              return  <span key={problemDetails?.id} className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                        {topic}
                    </span> 
            })
          }
        </div>

        {/* TO BE DONE BUT*/}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
          <span>✓ <span className="text-foreground font-medium">14.2M</span> accepted</span>
          <span className="text-border">|</span>
          <span>↑ <span className="text-foreground font-medium">52.3%</span> acceptance</span>
          <span className="text-border">|</span>
          <span>Asked by <span className="text-foreground font-medium">{problemDetails?.companies.join(", ")}</span></span>
        </div>
      </div>

      <hr className="border-border" />

      {/* Problem statement */}
      <div className="flex flex-col gap-3 leading-relaxed">
            {problemDetails?.metaData?.description}
      </div>

      {/* Examples */}
        <div className="flex flex-col gap-4">
        {
            problemDetails?.metaData?.testCases.map((ex:TestCases,id:number) => (
          <div key={ex.id} className="flex flex-col gap-2">
            <p className="font-semibold text-foreground">Example {id+1}</p>
            <div className="rounded-lg bg-muted border border-border px-4 py-3 font-mono text-xs leading-6 text-foreground">
              <div>
                <span className="text-muted-foreground">Input: &nbsp;</span>
                {ex.input}
              </div>
              <div>
                <span className="text-muted-foreground">Output:</span> {ex.output}
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
          {
            problemDetails?.metaData?.constraints.map((constraint:string)=>{
                return <li key={problemDetails?.id}>{constraint}</li>
            })
          }
        </ul>
      </div>

      {/* pending */}
      <div className="rounded-lg border border-border bg-card px-4 py-3 text-xs text-muted-foreground leading-relaxed">
        <span className="font-semibold text-foreground">Follow-up: </span>
        Can you come up with an algorithm that is less than{" "}
        <span className="font-mono text-foreground">O(n²)</span> time complexity?
      </div>

    </div>
  );
}

// Inline code token — uses your design tokens
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-xs bg-muted text-foreground px-1.5 py-0.5 rounded border border-border">
      {children}
    </code>
  );
}