-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_localFileId_fkey";

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_localFileId_fkey" FOREIGN KEY ("localFileId") REFERENCES "LocalFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
