-- DropForeignKey
ALTER TABLE "ImageUrls" DROP CONSTRAINT "ImageUrls_imageUrlId_fkey";

-- DropForeignKey
ALTER TABLE "PossibleUseCase" DROP CONSTRAINT "PossibleUseCase_possibleUseCaesId_fkey";

-- AlterTable
ALTER TABLE "ImageUrls" ADD COLUMN     "toolsToolId" TEXT;

-- AlterTable
ALTER TABLE "PossibleUseCase" ADD COLUMN     "toolsToolId" TEXT;

-- AddForeignKey
ALTER TABLE "ImageUrls" ADD CONSTRAINT "ImageUrls_toolsToolId_fkey" FOREIGN KEY ("toolsToolId") REFERENCES "Tools"("toolId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PossibleUseCase" ADD CONSTRAINT "PossibleUseCase_toolsToolId_fkey" FOREIGN KEY ("toolsToolId") REFERENCES "Tools"("toolId") ON DELETE SET NULL ON UPDATE CASCADE;
