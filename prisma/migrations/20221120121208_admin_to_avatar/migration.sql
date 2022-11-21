/*
  Warnings:

  - You are about to drop the column `adminId` on the `LocalFile` table. All the data in the column will be lost.
  - Added the required column `localFileId` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LocalFile" DROP CONSTRAINT "LocalFile_adminId_fkey";

-- DropIndex
DROP INDEX "LocalFile_adminId_key";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "localFileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LocalFile" DROP COLUMN "adminId";

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_localFileId_fkey" FOREIGN KEY ("localFileId") REFERENCES "LocalFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
