/*
  Warnings:

  - You are about to drop the column `probabilityCoefficient` on the `Booster` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booster" RENAME COLUMN "probabilityCoefficient" TO "value";
