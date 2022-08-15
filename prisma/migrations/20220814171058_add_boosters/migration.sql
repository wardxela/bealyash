-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "boosterExpirationDate" TIMESTAMP(3),
ADD COLUMN     "boosterId" INTEGER;

-- CreateTable
CREATE TABLE "Booster" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 3600000,

    CONSTRAINT "Booster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booster_title_key" ON "Booster"("title");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_boosterId_fkey" FOREIGN KEY ("boosterId") REFERENCES "Booster"("id") ON DELETE SET NULL ON UPDATE CASCADE;
