/*
  Warnings:

  - You are about to drop the column `localFileId` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[avatarId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[filename]` on the table `LocalFile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_localFileId_fkey";

-- DropIndex
DROP INDEX "Admin_localFileId_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "localFileId",
ADD COLUMN     "avatarId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_avatarId_key" ON "Admin"("avatarId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalFile_filename_key" ON "LocalFile"("filename");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "LocalFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
