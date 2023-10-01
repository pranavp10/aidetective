/*
  Warnings:

  - The primary key for the `ImageURLs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageUrlId` on the `ImageURLs` table. All the data in the column will be lost.
  - You are about to drop the column `websiteUrl` on the `Tools` table. All the data in the column will be lost.
  - The required column `imageURLId` was added to the `ImageURLs` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `websiteURL` to the `Tools` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageURLs" DROP CONSTRAINT "ImageURLs_pkey",
DROP COLUMN "imageUrlId",
ADD COLUMN     "imageURLId" TEXT NOT NULL,
ADD CONSTRAINT "ImageURLs_pkey" PRIMARY KEY ("imageURLId");

-- AlterTable
ALTER TABLE "Tools" DROP COLUMN "websiteUrl",
ADD COLUMN     "websiteURL" TEXT NOT NULL;
