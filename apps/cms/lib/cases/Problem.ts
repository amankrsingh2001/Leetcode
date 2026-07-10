import { ProblemWithRelations } from "@/app/types/problemType";
import { redis } from "@/lib/redis";
import { prisma } from "@/lib/prisma";

const CACHE_TTL_SECONDS = 3600; // 1 hour, tune as needed

export async function setProblemConfig(problem: ProblemWithRelations) {
  try {
    const cacheKey = `problem:${problem.id}:config`;

    await redis.set(
      cacheKey,
      JSON.stringify(problem),
      "EX",
      CACHE_TTL_SECONDS
    );
  } catch (error) {
    // Don't let a Redis failure break the page load — worker can fall back to DB anyway
    console.error("Failed to cache problem config:", error);
  }
}

export async function getProblemConfig(problemId: string) {
  try {
    const cacheKey = `problem:${problemId}:config`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached) as ProblemWithRelations;
    }

    // Cache miss — fall back to DB, then repopulate cache
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      include: {
        metaData: true,
        signature: true,
        testCases: { take: 2 },
      },
    });

    if (!problem) return null;

    await setProblemConfig(problem);
    return problem;
  } catch (error) {
    console.error("Failed to get problem config:", error);
    throw error; // worker should know this failed, not silently continue
  }
}