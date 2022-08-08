-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gayId" INTEGER,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Chat" ("gayId", "id", "updatedAt") SELECT "gayId", "id", "updatedAt" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
