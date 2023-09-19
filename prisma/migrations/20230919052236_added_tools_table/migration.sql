-- CreateEnum
CREATE TYPE "Pricing" AS ENUM ('free', 'paid', 'free_trail', 'free_trail_no_card');

-- CreateTable
CREATE TABLE "ImageUrls" (
    "imageUrlId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,

    CONSTRAINT "ImageUrls_pkey" PRIMARY KEY ("imageUrlId")
);

-- CreateTable
CREATE TABLE "PossibleUseCase" (
    "possibleUseCaesId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,

    CONSTRAINT "PossibleUseCase_pkey" PRIMARY KEY ("possibleUseCaesId")
);

-- CreateTable
CREATE TABLE "Tools" (
    "toolId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "featuredAt" TIMESTAMP(3),
    "pricing" "Pricing" NOT NULL DEFAULT 'free',
    "appStoreURL" TEXT,
    "playStoreURL" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Tools_pkey" PRIMARY KEY ("toolId")
);

-- CreateTable
CREATE TABLE "Tags" (
    "tagId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "_TagsToTools" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PossibleUseCase_toolId_possibleUseCaesId_key" ON "PossibleUseCase"("toolId", "possibleUseCaesId");

-- CreateIndex
CREATE UNIQUE INDEX "Tools_toolId_key" ON "Tools"("toolId");

-- CreateIndex
CREATE UNIQUE INDEX "Tools_slug_key" ON "Tools"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_tagId_key" ON "Tags"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_slug_key" ON "Tags"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_TagsToTools_AB_unique" ON "_TagsToTools"("A", "B");

-- CreateIndex
CREATE INDEX "_TagsToTools_B_index" ON "_TagsToTools"("B");

-- AddForeignKey
ALTER TABLE "ImageUrls" ADD CONSTRAINT "ImageUrls_imageUrlId_fkey" FOREIGN KEY ("imageUrlId") REFERENCES "Tools"("toolId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PossibleUseCase" ADD CONSTRAINT "PossibleUseCase_possibleUseCaesId_fkey" FOREIGN KEY ("possibleUseCaesId") REFERENCES "Tools"("toolId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToTools" ADD CONSTRAINT "_TagsToTools_A_fkey" FOREIGN KEY ("A") REFERENCES "Tags"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToTools" ADD CONSTRAINT "_TagsToTools_B_fkey" FOREIGN KEY ("B") REFERENCES "Tools"("toolId") ON DELETE CASCADE ON UPDATE CASCADE;
