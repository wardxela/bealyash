/*
  Warnings:

  - You are about to drop the column `coefficientOffset` on the `Booster` table. All the data in the column will be lost.
  - You are about to drop the column `coefficient` on the `Rarity` table. All the data in the column will be lost.
  - Added the required column `probability` to the `Rarity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booster" DROP COLUMN "coefficientOffset",
ALTER COLUMN "probabilityCoefficient" SET DEFAULT 1,
ALTER COLUMN "probabilityCoefficient" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Rarity" RENAME COLUMN "coefficient" TO "probability";
