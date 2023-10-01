/*
  Warnings:

  - You are about to drop the column `toolsToolId` on the `ImageUrls` table. All the data in the column will be lost.
  - You are about to drop the column `toolsToolId` on the `PossibleUseCase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImageUrls" DROP CONSTRAINT "ImageUrls_toolsToolId_fkey";

-- DropForeignKey
ALTER TABLE "PossibleUseCase" DROP CONSTRAINT "PossibleUseCase_toolsToolId_fkey";

-- AlterTable
ALTER TABLE "ImageUrls" DROP COLUMN "toolsToolId";

-- AlterTable
ALTER TABLE "PossibleUseCase" DROP COLUMN "toolsToolId";

-- AddForeignKey
ALTER TABLE "ImageUrls" ADD CONSTRAINT "ImageUrls_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tools"("toolId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PossibleUseCase" ADD CONSTRAINT "PossibleUseCase_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tools"("toolId") ON DELETE RESTRICT ON UPDATE CASCADE;
