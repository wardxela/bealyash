-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolesOnProfiles" (
    "userId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "RolesOnProfiles_pkey" PRIMARY KEY ("userId","chatId","roleId")
);

-- AddForeignKey
ALTER TABLE "RolesOnProfiles" ADD CONSTRAINT "RolesOnProfiles_userId_chatId_fkey" FOREIGN KEY ("userId", "chatId") REFERENCES "Profile"("userId", "chatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesOnProfiles" ADD CONSTRAINT "RolesOnProfiles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
