import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { saltAndHashPassword } from "@/app/utils/password";
import { createUser } from "@/app/utils/zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseData = createUser.safeParse(body);

    if (!parseData?.success) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }
    // If the zod validation is correct then hash the password to create user in the db

    const hashedPassword = await saltAndHashPassword(parseData?.data?.password);
    const user = await prisma.user.create({
      data:{
        fullName:parseData.data.fullName,
        email:parseData.data.email,
        password:hashedPassword
      }
    })

    return NextResponse.json({
      success: true,

    });
  } catch (error: any) {
    console.log(error);

    // Handle duplicate email error
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
