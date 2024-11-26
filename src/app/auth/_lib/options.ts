import { UserType } from "@prisma/client";
import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "./credentials";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [CredentialsProvider],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.type = user.type;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.type = token.type as UserType;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth/error",
    signOut: "/auth/logout",
    newUser: "/auth/register",
  },
};

export default authOptions;

export const getServerSideSession = async () => getServerSession(authOptions);
