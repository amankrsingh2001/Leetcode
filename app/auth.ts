import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { jwt } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      async authorize(credentials) {

   
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findFirst({
          where:{
            email:credentials?.email as string,
          }
        })
        if(!user){
          return null
        }
         const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isValid) {
            return null;
          }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
        };
      },
    }),
  ],
  session:{
    strategy:'jwt'
  },
  callbacks:{
    async jwt({token , user}){
      console.log("JWT CALLBACK - Initial User:", user);
      if(user){
        token.id = user.id
      }
      console.log("JWT CALLBACK - Resulting Token:", token);
      return token
    },
    async session({session, token}){
      console.log("SESSION CALLBACK - Incoming Token:", token);
      if(session.user ){
        session.user.id = token.id as string
      }
      console.log("SESSION CALLBACK - Final Session Object:", session);
      return session;
    }

  }
  , secret: process.env.JWT_SECRET
});