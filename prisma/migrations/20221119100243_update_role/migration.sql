/*
  Warnings:

  - You are about to drop the column `assignedBy` on the `AdminsOnRoles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdminsOnRoles" DROP COLUMN "assignedBy";

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "description" DROP NOT NULL;
