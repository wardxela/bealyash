-- CreateTable
CREATE TABLE "Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gayId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Profile" (
    "userId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gayCounter" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("userId", "chatId"),
    CONSTRAINT "Profile_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
