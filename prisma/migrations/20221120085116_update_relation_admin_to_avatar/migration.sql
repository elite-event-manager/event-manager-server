/*
  Warnings:

  - You are about to drop the column `avatarId` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminId]` on the table `LocalFile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `LocalFile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_avatarId_fkey";

-- DropIndex
DROP INDEX "Admin_avatarId_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "avatarId";

-- AlterTable
ALTER TABLE "LocalFile" ADD COLUMN     "adminId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LocalFile_adminId_key" ON "LocalFile"("adminId");

-- AddForeignKey
ALTER TABLE "LocalFile" ADD CONSTRAINT "LocalFile_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
