/*
  Warnings:

  - You are about to drop the `BoostersOnProfiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BoostersOnProfiles" DROP CONSTRAINT "BoostersOnProfiles_boosterId_fkey";

-- DropForeignKey
ALTER TABLE "BoostersOnProfiles" DROP CONSTRAINT "BoostersOnProfiles_userId_chatId_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "boosterExpirationDate" TIMESTAMP(3),
ADD COLUMN     "boosterId" INTEGER;

-- DropTable
DROP TABLE "BoostersOnProfiles";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_boosterId_fkey" FOREIGN KEY ("boosterId") REFERENCES "Booster"("id") ON DELETE SET NULL ON UPDATE CASCADE;
