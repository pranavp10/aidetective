/*
  Warnings:

  - You are about to drop the `Subscribe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Subscribe";

-- CreateTable
CREATE TABLE "EmailSubscribe" (
    "id" TEXT NOT NULL,
    "emailID" TEXT NOT NULL,

    CONSTRAINT "EmailSubscribe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailSubscribe_id_key" ON "EmailSubscribe"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EmailSubscribe_emailID_key" ON "EmailSubscribe"("emailID");
