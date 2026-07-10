
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { redis } from "@/lib/redis"; // Path to your Redis singleton
import { auth } from "@/app/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user?.id) {


      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid or expired session" },
        { status: 401 }
      );
    }

    const ticket = randomUUID();


    await redis.set(`ws_ticket:${ticket}`, session.user.id, 
      "EX", 300, 
    );


    return NextResponse.json({ success: true, ticket }, { status: 200 });

  } catch (error) {
    console.error("WebSocket Ticket Generation Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal Server Error", 
        message: error instanceof Error ? error.message : "An unknown error occurred" 
      },
      { status: 500 }
    );
  }
}