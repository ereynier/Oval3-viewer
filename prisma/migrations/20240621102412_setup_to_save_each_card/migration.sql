-- CreateTable
CREATE TABLE "Card" (
    "owner" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "opta_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("tokenId")
);

-- CreateTable
CREATE TABLE "Player" (
    "opta_id" TEXT NOT NULL,
    "academy" BOOLEAN NOT NULL,
    "age" INTEGER NOT NULL,
    "club" TEXT NOT NULL,
    "competition" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "international" BOOLEAN NOT NULL,
    "nationality" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "score" DECIMAL(65,30) NOT NULL,
    "season" TEXT NOT NULL,
    "serial_Number" DECIMAL(65,30) NOT NULL,
    "max_serial_Number" DECIMAL(65,30) NOT NULL,
    "appearances" INTEGER NOT NULL,
    "attack" DECIMAL(65,30) NOT NULL,
    "defence" DECIMAL(65,30) NOT NULL,
    "evolution" DECIMAL(65,30) NOT NULL,
    "impact" DECIMAL(65,30) NOT NULL,
    "last_scoring" DECIMAL(65,30) NOT NULL,
    "minutes_played_total" DECIMAL(65,30) NOT NULL,
    "red_cards" INTEGER NOT NULL,
    "scoring" DECIMAL(65,30) NOT NULL,
    "skills" DECIMAL(65,30) NOT NULL,
    "strength" DECIMAL(65,30) NOT NULL,
    "tries" INTEGER NOT NULL,
    "yellow_cards" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("opta_id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "attack" DECIMAL(65,30) NOT NULL,
    "defence" DECIMAL(65,30) NOT NULL,
    "game_date" TEXT NOT NULL,
    "impact" DECIMAL(65,30) NOT NULL,
    "metadata_total" DECIMAL(65,30) NOT NULL,
    "skills" DECIMAL(65,30) NOT NULL,
    "strength" DECIMAL(65,30) NOT NULL,
    "playerOpta_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_tokenId_key" ON "Card"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_opta_id_key" ON "Player"("opta_id");

-- CreateIndex
CREATE UNIQUE INDEX "Game_id_key" ON "Game"("id");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_opta_id_fkey" FOREIGN KEY ("opta_id") REFERENCES "Player"("opta_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_playerOpta_id_fkey" FOREIGN KEY ("playerOpta_id") REFERENCES "Player"("opta_id") ON DELETE RESTRICT ON UPDATE CASCADE;
