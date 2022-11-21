/*
  Warnings:

  - A unique constraint covering the columns `[tag]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tag` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "tag" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Role_tag_key" ON "Role"("tag");
