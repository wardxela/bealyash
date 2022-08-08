/*
  Warnings:

  - Added the required column `updatedAt` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gayId" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Chat" ("gayId", "id") SELECT "gayId", "id" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
