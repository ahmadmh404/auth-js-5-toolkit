import { UserRole } from "@prisma/client";
import { type User, type DefaultSession } from "next-auth";

export type ExtendedUser = {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
} & User;

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
