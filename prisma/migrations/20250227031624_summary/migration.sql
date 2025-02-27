/*
  Warnings:

  - You are about to drop the column `summary` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "summary",
ADD COLUMN     "availableCopies" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "publisher" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "salesVolume" INTEGER NOT NULL DEFAULT 0;
