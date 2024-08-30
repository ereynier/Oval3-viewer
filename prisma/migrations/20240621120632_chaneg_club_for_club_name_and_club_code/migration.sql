/*
  Warnings:

  - You are about to drop the column `club` on the `Player` table. All the data in the column will be lost.
  - Added the required column `clubCode` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clubName` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "club",
ADD COLUMN     "clubCode" TEXT NOT NULL,
ADD COLUMN     "clubName" TEXT NOT NULL;
