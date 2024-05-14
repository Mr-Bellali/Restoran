/*
  Warnings:

  - You are about to alter the column `image` on the `chefs` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `Text`.

*/
-- AlterTable
ALTER TABLE `chefs` MODIFY `image` TEXT NOT NULL;
