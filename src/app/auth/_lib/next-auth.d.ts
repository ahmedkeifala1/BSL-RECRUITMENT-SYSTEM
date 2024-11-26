import { UserType } from "@prisma/client";
import { DefaultSession, User as NextUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
  interface User extends NextUser {
    type: UserType;
    isVerified: boolean;
  }
}
