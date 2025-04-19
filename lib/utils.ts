// These methods are used in the all server side files like server action, api routes and server componenets

import { auth } from "@/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currentRole = async () => {
  const session = await auth();

  return session?.user.role;
};
