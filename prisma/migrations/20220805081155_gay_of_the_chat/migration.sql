/*
  Warnings:

  - You are about to drop the `Reputation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gayId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_ChatToUser_B_index";

-- DropIndex
DROP INDEX "_ChatToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Reputation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ChatToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_UsersOfChat" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UsersOfChat_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UsersOfChat_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gayId" INTEGER NOT NULL,
    CONSTRAINT "Chat_gayId_fkey" FOREIGN KEY ("gayId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Chat" ("id") SELECT "id" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_UsersOfChat_AB_unique" ON "_UsersOfChat"("A", "B");

-- CreateIndex
CREATE INDEX "_UsersOfChat_B_index" ON "_UsersOfChat"("B");
