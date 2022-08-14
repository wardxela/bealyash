-- DropForeignKey
ALTER TABLE "RolesOnProfiles" DROP CONSTRAINT "RolesOnProfiles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "RolesOnProfiles" DROP CONSTRAINT "RolesOnProfiles_userId_chatId_fkey";

-- AddForeignKey
ALTER TABLE "RolesOnProfiles" ADD CONSTRAINT "RolesOnProfiles_userId_chatId_fkey" FOREIGN KEY ("userId", "chatId") REFERENCES "Profile"("userId", "chatId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesOnProfiles" ADD CONSTRAINT "RolesOnProfiles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
