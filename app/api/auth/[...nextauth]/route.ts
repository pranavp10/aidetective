import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
 adapter: PrismaAdapter(prisma),
 secret: process.env.NEXTAUTH_SECRET,
 providers: [
  GithubProvider({
   clientId: process.env.GITHUB_ID ?? '',
   clientSecret: process.env.GITHUB_SECRET ?? ""
  }),
  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID ?? '',
   clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  }),
 ]
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as Post }
