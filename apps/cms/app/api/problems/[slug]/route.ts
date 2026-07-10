import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const problem = await prisma.problem.findUnique({
      where: {
        slug,
      },
      include: {
        metaData: true,
        testCases:true
      },
    });

    if (!problem) {
      return NextResponse.json(
        {
          success: false,
          message: "Problem not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: problem,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching problem:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}