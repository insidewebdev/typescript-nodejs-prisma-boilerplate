// src/server/db/client.ts
import { NODE_ENV } from "@/config";
import { PrismaClient } from "@prisma/client";

// declare global {
//     var prisma: PrismaClient | undefined;
// }

// export const prisma =
//     global.prisma ||
//     new PrismaClient({
//         log: ["query"],
//     });

// if (NODE_ENV !== "production") {
//     global.prisma = prisma;
// }

export const prisma = new PrismaClient({
    log: ["query"],
});