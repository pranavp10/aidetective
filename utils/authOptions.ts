import { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
 adapter: PrismaAdapter(prisma),
 secret: process.env.NEXTAUTH_SECRET,
 providers: [
  GithubProvider({
   clientId: process.env.GITHUB_ID ?? '',
   clientSecret: process.env.GITHUB_SECRET ?? "",
   profile(profile) {
    return { role: "USER", ...profile }
   },
  }),
  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID ?? '',
   clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
   profile(profile) {
    return { role: "USER", ...profile }
   },
  }),
 ],
 pages: {
  signIn: '/login'
 },
 session: {
  strategy: 'jwt'
 },
 callbacks: {
  jwt({ token, user }) {
   if (user) token.role = user.role
   return token
  },
  session({ session, token }) {
   if (session.user) session.user.role = token.role
   return session
  }
 }
}
