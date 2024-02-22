/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Blocks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Blocks_id_key" ON "Blocks"("id");
