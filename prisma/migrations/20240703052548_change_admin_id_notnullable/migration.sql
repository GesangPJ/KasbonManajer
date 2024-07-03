-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Kasbon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "adminId" INTEGER DEFAULT 0,
    "jumlah" INTEGER NOT NULL,
    "metode" TEXT,
    "status_r" TEXT,
    "status_b" TEXT,
    "keterangan" TEXT,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Kasbon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Kasbon_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Kasbon" ("adminId", "createdAt", "id", "jumlah", "keterangan", "metode", "status_b", "status_r", "updatedAt", "userId") SELECT "adminId", "createdAt", "id", "jumlah", "keterangan", "metode", "status_b", "status_r", "updatedAt", "userId" FROM "Kasbon";
DROP TABLE "Kasbon";
ALTER TABLE "new_Kasbon" RENAME TO "Kasbon";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
