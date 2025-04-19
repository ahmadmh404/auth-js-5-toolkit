import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// this is in enviroment cuz on each hotreload a new prismaClient is initiated and we store this in the globalThis cuz it doesn't effect by the hotreload
