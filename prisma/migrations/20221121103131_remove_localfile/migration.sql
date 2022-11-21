-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "avatar" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" DROP NOT NULL;
