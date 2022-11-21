-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_localFileId_fkey";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_localFileId_fkey" FOREIGN KEY ("localFileId") REFERENCES "LocalFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
