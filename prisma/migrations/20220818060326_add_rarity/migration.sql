-- CreateTable
CREATE TABLE "Rarity" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "coefficient" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Rarity_pkey" PRIMARY KEY ("id")
);
