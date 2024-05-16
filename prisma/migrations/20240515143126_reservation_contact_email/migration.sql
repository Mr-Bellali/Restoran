/*
  Warnings:

  - Added the required column `email` to the `Contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contacts` ADD COLUMN `email` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `Reservations` (
    `id_reservation` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `date_reservation` DATETIME(3) NOT NULL,
    `number_of_poeple` INTEGER NOT NULL,
    `special_request` TEXT NOT NULL,
    `id_restorant_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id_reservation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_id_restorant_fk_fkey` FOREIGN KEY (`id_restorant_fk`) REFERENCES `Restorant`(`id_restorant`) ON DELETE RESTRICT ON UPDATE CASCADE;
