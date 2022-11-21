-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_avatarId_fkey";

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "LocalFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
