-- CreateEnum
CREATE TYPE "Pricing" AS ENUM ('free', 'paid', 'free_trail', 'free_trail_no_card', 'freemium', 'waitlist', 'request_demo', 'yearly_subscription', 'one_time_payment');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "oauth_token" TEXT,
    "oauth_token_secret" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Tools" (
    "toolId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "websiteURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "featuredAt" TIMESTAMP(3),
    "pricing" "Pricing" NOT NULL DEFAULT 'free',
    "isToolPublished" BOOLEAN NOT NULL DEFAULT false,
    "appStoreURL" TEXT,
    "playStoreURL" TEXT,
    "userId" TEXT NOT NULL,
    "possibleUseCase" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "Tools_pkey" PRIMARY KEY ("toolId")
);

-- CreateTable
CREATE TABLE "Tags" (
    "tagId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "emoji" VARCHAR(255) NOT NULL DEFAULT '❓',

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("tagId")
);

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

-- CreateTable
CREATE TABLE "_TagsToTools" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Tools_toolId_key" ON "Tools"("toolId");

-- CreateIndex
CREATE UNIQUE INDEX "Tools_slug_key" ON "Tools"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_tagId_key" ON "Tags"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_slug_key" ON "Tags"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_bookmarkId_key" ON "Bookmark"("bookmarkId");

-- CreateIndex
CREATE UNIQUE INDEX "Collections_collectionId_key" ON "Collections"("collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "ToolsCollections_toolsCollectionId_key" ON "ToolsCollections"("toolsCollectionId");

-- CreateIndex
CREATE UNIQUE INDEX "_TagsToTools_AB_unique" ON "_TagsToTools"("A", "B");

-- CreateIndex
CREATE INDEX "_TagsToTools_B_index" ON "_TagsToTools"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tools"("toolId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "Collections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsCollections" ADD CONSTRAINT "ToolsCollections_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collections"("collectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsCollections" ADD CONSTRAINT "ToolsCollections_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tools"("toolId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToTools" ADD CONSTRAINT "_TagsToTools_A_fkey" FOREIGN KEY ("A") REFERENCES "Tags"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToTools" ADD CONSTRAINT "_TagsToTools_B_fkey" FOREIGN KEY ("B") REFERENCES "Tools"("toolId") ON DELETE CASCADE ON UPDATE CASCADE;
