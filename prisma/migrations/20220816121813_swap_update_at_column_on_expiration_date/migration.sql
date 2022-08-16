/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `BoostersOnProfiles` table. All the data in the column will be lost.
  - Added the required column `expirationDate` to the `BoostersOnProfiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BoostersOnProfiles" DROP COLUMN "updatedAt",
ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL;
