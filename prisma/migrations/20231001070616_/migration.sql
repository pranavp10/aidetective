/*
  Warnings:

  - You are about to drop the `ImageUrls` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImageUrls" DROP CONSTRAINT "ImageUrls_toolId_fkey";

-- DropIndex
DROP INDEX "PossibleUseCase_toolId_possibleUseCaesId_key";

-- DropTable
DROP TABLE "ImageUrls";

-- CreateTable
CREATE TABLE "ImageURLs" (
    "imageUrlId" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,

    CONSTRAINT "ImageURLs_pkey" PRIMARY KEY ("imageUrlId")
);

-- AddForeignKey
ALTER TABLE "ImageURLs" ADD CONSTRAINT "ImageURLs_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tools"("toolId") ON DELETE RESTRICT ON UPDATE CASCADE;
