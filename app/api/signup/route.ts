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
    if(!user?.id){
      return NextResponse.json({
        error:"Failed to create user"
        
      },{status:402})
    }

    return NextResponse.json({
      success: true,

    });
  } catch (error:unknown ) {
    console.log(error);
    const err = error as Record<string, unknown>;

    if(err && err.code === "p2002" && typeof error ==="object" && err.meta !== null && Array.isArray((err.meta as Record<string, unknown>).target) && ((err.meta as Record<string, unknown>).target as string[]).includes('email'))
{
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
