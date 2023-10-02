/*
  Warnings:

  - You are about to drop the `ImageURLs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PossibleUseCase` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageURLs` to the `Tools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `possibleUseCase` to the `Tools` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ImageURLs" DROP CONSTRAINT "ImageURLs_toolId_fkey";

-- DropForeignKey
ALTER TABLE "PossibleUseCase" DROP CONSTRAINT "PossibleUseCase_toolId_fkey";

-- AlterTable
ALTER TABLE "Tools" ADD COLUMN     "imageURLs" TEXT NOT NULL,
ADD COLUMN     "possibleUseCase" TEXT NOT NULL;

-- DropTable
DROP TABLE "ImageURLs";

-- DropTable
DROP TABLE "PossibleUseCase";
