/*
  Warnings:

  - You are about to drop the column `academy` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `clubCode` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `clubName` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `competition` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `international` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "academy" BOOLEAN,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "clubCode" TEXT,
ADD COLUMN     "clubName" TEXT,
ADD COLUMN     "competition" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "international" BOOLEAN,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "season" TEXT;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "academy",
DROP COLUMN "age",
DROP COLUMN "clubCode",
DROP COLUMN "clubName",
DROP COLUMN "competition",
DROP COLUMN "image",
DROP COLUMN "international",
DROP COLUMN "name",
DROP COLUMN "nationality",
DROP COLUMN "position",
DROP COLUMN "season";
