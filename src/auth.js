import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import authConfig from "@/auth.config";
import { getUserById } from "./lib/actions/auth";

export const options = {
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  // ORIGINAL. 

  callbacks: {
    async jwt({ token}) {
    
      if (!token.sub) return token;

      const u = await getUserById( token.sub ); 
      if (!u) return token;

      token.role = u?.role;

      return token;
    },

    async session({ session, token }) {
      session.user.role = token?.role;
      session.user.id = token?.sub;     // Para incluir ID de usuario
      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({ ...options, ...authConfig });
