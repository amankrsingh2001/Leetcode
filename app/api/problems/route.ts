import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const problems = await prisma.problem.findMany();
    if (problems.length === 0) {
      return NextResponse.json(
        { message: "No problems found" },
        { status: 404 }
      );
    }

    return NextResponse.json(problems, {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}