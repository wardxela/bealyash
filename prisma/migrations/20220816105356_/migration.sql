/*
  Warnings:

  - You are about to drop the `GayBooster` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_gayBoosterId_fkey";

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

    CONSTRAINT "Booster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booster_title_key" ON "Booster"("title");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_gayBoosterId_fkey" FOREIGN KEY ("gayBoosterId") REFERENCES "Booster"("id") ON DELETE SET NULL ON UPDATE CASCADE;
