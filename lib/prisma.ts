// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient();
} else {
  let glob = global as any;
  if (!glob.prisma) {
    glob.prisma = new PrismaClient();
  }
  prismaClient = glob.prisma;
}

export { prismaClient };
