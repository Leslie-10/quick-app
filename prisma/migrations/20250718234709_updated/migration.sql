/*
  Warnings:

  - You are about to drop the column `categorie` on the `besoins` table. All the data in the column will be lost.
  - Added the required column `categorieId` to the `besoins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `besoins` DROP COLUMN `categorie`,
    ADD COLUMN `categorieId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `candidatures` MODIFY `budgetPropose` DOUBLE NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('client', 'prestataire', 'les_deux', 'admin') NULL DEFAULT 'client';

-- CreateTable
CREATE TABLE `Categorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categorie_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `besoins` ADD CONSTRAINT `besoins_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Categorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
