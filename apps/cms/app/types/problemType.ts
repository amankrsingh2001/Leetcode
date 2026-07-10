import { Prisma } from "@prisma/client";

export type ProblemWithRelations = Prisma.ProblemGetPayload<{
  include: {
    metaData: true;
    testCases:true;
    signature: true;
  };
}>;

export interface TestCase {
  id: string;
  problemId: string;
  input: Prisma.JsonValue;
  expected: Prisma.JsonValue;
  explanation: string | null;
  label?: string;
}