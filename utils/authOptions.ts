import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      profile(profile) {
        return {
          role: "USER",
          userId: profile.sub,
          email: profile.email,
          image: profile.avatar_url,
          name: profile.login,
          id: profile.node_id,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      profile(profile) {
        return {
          role: "USER",
          userId: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          id: profile.sub,
        };
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID ?? "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? "",
      profile(profile) {
        return {
          role: "USER",
          userId: profile.id_str,
          name: profile.name,
          username: profile.username,
          email: profile.email,
          image: profile.profile_image_url,
          id: profile.id_str,
        };
      },

    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        if (token.userId) {
          session.user.id = token.userId;
        }
        session.user.role = token.role;
      }
      return session;
    },
  },
};
