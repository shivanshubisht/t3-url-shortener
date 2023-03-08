-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "customname" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_linkId_key" ON "Link"("linkId");

-- CreateIndex
CREATE UNIQUE INDEX "Link_customname_key" ON "Link"("customname");
