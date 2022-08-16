/*
  Warnings:

  - You are about to drop the column `coefficient` on the `Booster` table. All the data in the column will be lost.
  - You are about to drop the column `boosterExpirationDate` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `boosterId` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_boosterId_fkey";

-- AlterTable
ALTER TABLE "Booster" DROP COLUMN "coefficient",
ADD COLUMN     "coefficientOffset" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "probabilityCoefficient" INTEGER NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "boosterExpirationDate",
DROP COLUMN "boosterId",
ADD COLUMN     "gayBoosterExpirationDate" TIMESTAMP(3),
ADD COLUMN     "gayBoosterId" INTEGER;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_gayBoosterId_fkey" FOREIGN KEY ("gayBoosterId") REFERENCES "Booster"("id") ON DELETE SET NULL ON UPDATE CASCADE;
