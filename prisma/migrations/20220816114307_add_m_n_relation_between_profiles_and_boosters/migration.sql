/*
  Warnings:

  - You are about to drop the column `gayBoosterExpirationDate` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `gayBoosterId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `GayBooster` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_gayBoosterId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "gayBoosterExpirationDate",
DROP COLUMN "gayBoosterId";

-- DropTable
DROP TABLE "GayBooster";

-- CreateTable
CREATE TABLE "Booster" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 3600000,
    "coefficientOffset" INTEGER NOT NULL DEFAULT 0,
    "probabilityCoefficient" INTEGER NOT NULL DEFAULT 100,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Booster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoostersOnProfiles" (
    "userId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "boosterId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoostersOnProfiles_pkey" PRIMARY KEY ("userId","chatId","boosterId")
);

-- CreateTable
CREATE TABLE "BoosterCategory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "boosterId" INTEGER NOT NULL,

    CONSTRAINT "BoosterCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booster_title_key" ON "Booster"("title");

-- CreateIndex
CREATE UNIQUE INDEX "BoosterCategory_title_key" ON "BoosterCategory"("title");

-- AddForeignKey
ALTER TABLE "Booster" ADD CONSTRAINT "Booster_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BoosterCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoostersOnProfiles" ADD CONSTRAINT "BoostersOnProfiles_userId_chatId_fkey" FOREIGN KEY ("userId", "chatId") REFERENCES "Profile"("userId", "chatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoostersOnProfiles" ADD CONSTRAINT "BoostersOnProfiles_boosterId_fkey" FOREIGN KEY ("boosterId") REFERENCES "Booster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
