import { Worker } from "bullmq";
import { redis } from "../redis";
import { prisma } from "../lib/prisma";
import { parameterSchema } from "../judge/signature/validator";
import { generateWrapper } from "../judge/cpp/generateWrapper";
import axios from "axios";



export type PrimitiveType = "string" | "number" | "boolean" | "array"

export interface SignatureParameter{
    name:string;
    type:PrimitiveType;
    items?:PrimitiveType | SignatureParameter["type"]
}

export const runWorker = new Worker(
  "run-code",
  async (job) => {
    const { problemId, code } = job.data;


    const problemConfig = await redis.get(`problem:${problemId}`);

    if (!problemConfig) {
      throw new Error("Problem config not found");
    }

    const { testCases, signature } = JSON.parse(problemConfig);


    if (!testCases || !signature) {
      throw new Error("Problem configuration not found in Redis");
    }


    const functionName = signature.functionName;
    const parameters = parameterSchema.parse(signature.parameters);

    const result = [];

    for (const testcase of testCases) {
      const input = testcase.input;

      if (!input || typeof input !== "object" || Array.isArray(input)) {
        throw new Error("Invalid testcase input");
      }

      const wrapper = generateWrapper(
        code,
        input,
        parameters,
        functionName
      );

      try {
        const response = await axios.post(
          `${process.env.CODEBOX_URL}/submissions?wait=true`,
          {
            source_code: wrapper,
            language_id: 54,
            stdin: "",
          },
          {
            headers: {
              "X-Auth-Token": process.env.CODEBOX_AUTH_TOKEN,
              "Content-Type": "application/json",
            },
          }
        );

       
        result.push({
            id: testcase.id,
            input: testcase.input,
            expected: testcase.expected,
            ...response.data, 
          });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.status);
          console.log(err.response?.data);
        }
        throw err;
      }
    }
    console.log(result,"This is the result we are checking")
    return result;
  },
  {
    connection: redis,
  }
);

export const submitCode = new Worker("submit-code", async(job)=>{
    const problem = await prisma.problem.findUnique({
        where:{
            id:job.data.problemId
        },
        include:{
          testCases:true,
          signature:true
        }
    })

    if (!problem) {
      throw new Error("Problem not found");
    }
  

    if (!problem.signature) {
      throw new Error("Signature not found");
    }

  
    const parameter = parameterSchema.parse(problem?.signature.parameters) ;

    const result = []
    for(const testcase of problem.testCases){
      const input = testcase?.input;
      if(input === null || typeof input !== "object"|| Array.isArray(input)){
        throw new Error("Invalid testcase input");
      }

      const wrapper = generateWrapper(
          job.data.code,
          input,
          parameter,
          problem.signature.functionName
      );

     try {
        const response = await axios.post(
          `${process.env.CODEBOX_URL}/submissions?wait=true`,
          {
            source_code: wrapper,
            language_id: 54,
            stdin: "",
          },{
          headers: {
            "X-Auth-Token": process.env.CODEBOX_AUTH_TOKEN,
            "Content-Type": "application/json",
          },
        }
        );
        result.push(response.data); 
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.status);
          console.log(err.response?.data); 
        }
        throw err;
      }
    }
    return result;
},{
    connection:redis
})




runWorker.on("active", (job) => {
  console.log("🔥 Active:", job.id);
});

runWorker.on("completed", (job) => {
  console.log("✅ Completed:", job.id);
});

runWorker.on("failed", (job, err) => {
  console.log("❌ Failed:", job?.id);
  console.error(err);
});