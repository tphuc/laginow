import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";

export interface TSession extends Session {
  user: User & { id: string };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {// This user return by provider {} as you mentioned above MY CONTENT {token:}

      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token, user }): Promise<TSession> {
      // Send properties to the client, like an access_token and user id from a provider.
      return {
        ...session,
        user: {
          ...user,
          id: user?.id as string,
        },
      };
    },
  },
};

export default NextAuth(authOptions);
