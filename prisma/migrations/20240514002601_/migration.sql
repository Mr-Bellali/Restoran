/*
  Warnings:

  - You are about to alter the column `Image` on the `meals` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `Text`.

*/
-- AlterTable
ALTER TABLE `meals` MODIFY `Image` TEXT NOT NULL;
