-- CreateTable
CREATE TABLE "AttachmentType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AttachmentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "accessKey" TEXT,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AttachmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
