-- CreateTable
CREATE TABLE "Kun" (
    "id" SERIAL NOT NULL,
    "photo_id" INTEGER NOT NULL,

    CONSTRAINT "Kun_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Kun" ADD CONSTRAINT "Kun_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "Attachment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
