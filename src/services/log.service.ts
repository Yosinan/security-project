import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// log user actions
export const logAction = async (userId: any, action: any, ip: any) => {
  try {
    await prisma.log.create({
      data: {
        userId,
        action,
        ip,
      },
    });
  } catch (error) {
    console.error("Failed to log action:", error);
  }
};