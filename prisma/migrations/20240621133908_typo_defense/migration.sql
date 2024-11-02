/*
  Warnings:

  - You are about to drop the column `defence` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `defence` on the `Player` table. All the data in the column will be lost.
  - Added the required column `defense` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defense` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "defence",
ADD COLUMN     "defense" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "defence",
ADD COLUMN     "defense" DECIMAL(65,30) NOT NULL;
