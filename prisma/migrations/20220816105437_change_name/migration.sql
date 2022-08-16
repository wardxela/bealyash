/*
  Warnings:

  - You are about to drop the `Booster` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_gayBoosterId_fkey";

-- DropTable
DROP TABLE "Booster";

-- CreateTable
CREATE TABLE "GayBooster" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 3600000,
    "coefficientOffset" INTEGER NOT NULL DEFAULT 0,
    "probabilityCoefficient" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "GayBooster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GayBooster_title_key" ON "GayBooster"("title");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_gayBoosterId_fkey" FOREIGN KEY ("gayBoosterId") REFERENCES "GayBooster"("id") ON DELETE SET NULL ON UPDATE CASCADE;
