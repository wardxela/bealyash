-- AlterTable
ALTER TABLE "Booster" ADD COLUMN     "rarityId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Booster" ADD CONSTRAINT "Booster_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "Rarity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
