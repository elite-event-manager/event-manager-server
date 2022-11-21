-- CreateTable
CREATE TABLE "LocalFileile" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,

    CONSTRAINT "LocalFileile_pkey" PRIMARY KEY ("id")
);
