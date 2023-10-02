-- CreateEnum
CREATE TYPE "Pricing" AS ENUM ('free', 'paid', 'free_trail', 'free_trail_no_card');

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

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ImageURLs" (
    "imageURLId" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,

    CONSTRAINT "ImageURLs_pkey" PRIMARY KEY ("imageURLId")
);

-- CreateTable
CREATE TABLE "PossibleUseCase" (
    "possibleUseCaseId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,

    CONSTRAINT "PossibleUseCase_pkey" PRIMARY KEY ("possibleUseCaseId")
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

    CONSTRAINT "Tools_pkey" PRIMARY KEY ("toolId")
);

-- CreateTable
CREATE TABLE "Tags" (
    "tagId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("tagId")
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
CREATE UNIQUE INDEX "_TagsToTools_AB_unique" ON "_TagsToTools"("A", "B");

-- CreateIndex
CREATE INDEX "_TagsToTools_B_index" ON "_TagsToTools"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageURLs" ADD CONSTRAINT "ImageURLs_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tools"("toolId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PossibleUseCase" ADD CONSTRAINT "PossibleUseCase_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tools"("toolId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToTools" ADD CONSTRAINT "_TagsToTools_A_fkey" FOREIGN KEY ("A") REFERENCES "Tags"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToTools" ADD CONSTRAINT "_TagsToTools_B_fkey" FOREIGN KEY ("B") REFERENCES "Tools"("toolId") ON DELETE CASCADE ON UPDATE CASCADE;
