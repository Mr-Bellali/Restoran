-- CreateTable
CREATE TABLE `Restorant` (
    `id_restorant` INTEGER NOT NULL AUTO_INCREMENT,
    `manager_restorant` VARCHAR(80) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `address` TEXT NOT NULL,
    `telephone_restorant` VARCHAR(12) NOT NULL,
    `email_restorant` VARCHAR(100) NOT NULL,
    `branch` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Restorant_branch_key`(`branch`),
    PRIMARY KEY (`id_restorant`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meals` (
    `id_meal` INTEGER NOT NULL AUTO_INCREMENT,
    `name_meal` VARCHAR(80) NOT NULL,
    `description` TEXT NOT NULL,
    `Price` DOUBLE NOT NULL,
    `Image` LONGBLOB NOT NULL,
    `id_restorant_fk` INTEGER NOT NULL,
    `id_category_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id_meal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id_category` INTEGER NOT NULL AUTO_INCREMENT,
    `type_category` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Categories_type_category_key`(`type_category`),
    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chefs` (
    `id_chef` INTEGER NOT NULL AUTO_INCREMENT,
    `name_chef` VARCHAR(80) NOT NULL,
    `designation` TEXT NOT NULL,
    `image` LONGBLOB NOT NULL,
    `id_restorant_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id_chef`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialsNet` (
    `id_social` INTEGER NOT NULL AUTO_INCREMENT,
    `facebook` TEXT NOT NULL,
    `twitter` TEXT NOT NULL,
    `instagram` TEXT NOT NULL,
    `id_chef_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id_social`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonials` (
    `id_testimonial` INTEGER NOT NULL AUTO_INCREMENT,
    `profession` VARCHAR(80) NOT NULL,
    `message` TEXT NOT NULL,
    `id_restorant_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id_testimonial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contacts` (
    `id_contact` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `subject` VARCHAR(120) NOT NULL,
    `message` TEXT NOT NULL,
    `id_restorant_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id_contact`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Meals` ADD CONSTRAINT `Meals_id_restorant_fk_fkey` FOREIGN KEY (`id_restorant_fk`) REFERENCES `Restorant`(`id_restorant`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meals` ADD CONSTRAINT `Meals_id_category_fk_fkey` FOREIGN KEY (`id_category_fk`) REFERENCES `Categories`(`id_category`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chefs` ADD CONSTRAINT `Chefs_id_restorant_fk_fkey` FOREIGN KEY (`id_restorant_fk`) REFERENCES `Restorant`(`id_restorant`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialsNet` ADD CONSTRAINT `SocialsNet_id_chef_fk_fkey` FOREIGN KEY (`id_chef_fk`) REFERENCES `Chefs`(`id_chef`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Testimonials` ADD CONSTRAINT `Testimonials_id_restorant_fk_fkey` FOREIGN KEY (`id_restorant_fk`) REFERENCES `Restorant`(`id_restorant`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contacts` ADD CONSTRAINT `Contacts_id_restorant_fk_fkey` FOREIGN KEY (`id_restorant_fk`) REFERENCES `Restorant`(`id_restorant`) ON DELETE RESTRICT ON UPDATE CASCADE;
