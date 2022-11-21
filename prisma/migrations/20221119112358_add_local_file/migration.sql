/*
  Warnings:

  - You are about to drop the `LocalFileile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LocalFileile";

-- CreateTable
CREATE TABLE "LocalFile" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,

    CONSTRAINT "LocalFile_pkey" PRIMARY KEY ("id")
);
