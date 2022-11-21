/*
  Warnings:

  - You are about to drop the column `avatarId` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `avatarId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `LocalFile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `avatar` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_avatarId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatarId_fkey";

-- DropIndex
DROP INDEX "Admin_avatarId_key";

-- DropIndex
DROP INDEX "User_avatarId_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "avatarId",
ADD COLUMN     "avatar" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarId",
ADD COLUMN     "avatar" TEXT NOT NULL;

-- DropTable
DROP TABLE "LocalFile";
