-- CreateTable
CREATE TABLE "Bookmark" (
    "bookmarkId" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("bookmarkId")
);

-- CreateTable
CREATE TABLE "Collections" (
    "collectionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageURL" TEXT,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Collections_pkey" PRIMARY KEY ("collectionId")
);

-- CreateTable
CREATE TABLE "ToolsCollections" (
    "toolsCollectionId" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "ToolsCollections_pkey" PRIMARY KEY ("toolsCollectionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_bookmarkId_key" ON "Bookmark"("bookmarkId");

-- CreateIndex
CREATE UNIQUE INDEX "Collections_collectionId_key" ON "Collections"("collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "ToolsCollections_toolsCollectionId_key" ON "ToolsCollections"("toolsCollectionId");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tools"("toolId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "Collections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsCollections" ADD CONSTRAINT "ToolsCollections_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tools"("toolId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsCollections" ADD CONSTRAINT "ToolsCollections_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collections"("collectionId") ON DELETE RESTRICT ON UPDATE CASCADE;
