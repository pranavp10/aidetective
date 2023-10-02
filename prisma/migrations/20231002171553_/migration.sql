/*
  Warnings:

  - You are about to drop the column `imageURLs` on the `Tools` table. All the data in the column will be lost.
  - Added the required column `imageURL` to the `Tools` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tools" DROP COLUMN "imageURLs",
ADD COLUMN     "imageURL" TEXT NOT NULL;
