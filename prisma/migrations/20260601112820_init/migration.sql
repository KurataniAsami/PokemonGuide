/*
  Warnings:

  - You are about to drop the column `level` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `weight` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "level",
ADD COLUMN     "weight" INTEGER NOT NULL;
