-- CreateTable
CREATE TABLE "Subscribe" (
    "emailID" TEXT NOT NULL,

    CONSTRAINT "Subscribe_pkey" PRIMARY KEY ("emailID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscribe_emailID_key" ON "Subscribe"("emailID");
