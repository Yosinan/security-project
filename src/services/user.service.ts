
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUserProfile = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

export const updateUserProfile = async (
  userId: string,
  data: { name: string; avatar: string }
) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
};

export const deleteUserProfile = async (userId: string) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};
