/*
  Warnings:

  - Added the required column `userId` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "userId" TEXT NOT NULL;
