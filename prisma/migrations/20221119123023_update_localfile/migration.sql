/*
  Warnings:

  - A unique constraint covering the columns `[localFileId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "localFileId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_localFileId_key" ON "Admin"("localFileId");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_localFileId_fkey" FOREIGN KEY ("localFileId") REFERENCES "LocalFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
