/*
  Warnings:

  - The primary key for the `Blocks` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Blocks_blockNumber_key";

-- AlterTable
ALTER TABLE "Blocks" DROP CONSTRAINT "Blocks_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Blocks_pkey" PRIMARY KEY ("id");
