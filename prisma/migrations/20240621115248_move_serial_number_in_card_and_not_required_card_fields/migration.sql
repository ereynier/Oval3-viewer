/*
  Warnings:

  - You are about to drop the column `max_serial_Number` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `serial_Number` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "max_serial_Number" DECIMAL(65,30),
ADD COLUMN     "serial_Number" DECIMAL(65,30),
ALTER COLUMN "rarity" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "max_serial_Number",
DROP COLUMN "serial_Number";
