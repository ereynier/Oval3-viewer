-- CreateTable
CREATE TABLE "Owners" (
    "address" TEXT NOT NULL,
    "nfts" INTEGER[],

    CONSTRAINT "Owners_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Blocks" (
    "blockNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blocks_pkey" PRIMARY KEY ("blockNumber")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owners_address_key" ON "Owners"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Blocks_blockNumber_key" ON "Blocks"("blockNumber");
