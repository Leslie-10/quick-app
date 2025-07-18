/*
  Warnings:

  - You are about to drop the column `categorie` on the `besoins` table. All the data in the column will be lost.
  - Added the required column `categorieId` to the `besoins` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `besoins_userId_fkey` ON `besoins`;

-- DropIndex
DROP INDEX `candidatures_besoinId_fkey` ON `candidatures`;

-- DropIndex
DROP INDEX `candidatures_prestataireId_fkey` ON `candidatures`;

-- DropIndex
DROP INDEX `candidatures_professionId_fkey` ON `candidatures`;

-- DropIndex
DROP INDEX `notifications_besoinId_fkey` ON `notifications`;

-- DropIndex
DROP INDEX `notifications_userId_fkey` ON `notifications`;

-- DropIndex
DROP INDEX `profil_prestataire_professionId_fkey` ON `profil_prestataire`;

-- AlterTable
ALTER TABLE `besoins` DROP COLUMN `categorie`,
    ADD COLUMN `categorieId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `categorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categorie_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `besoins` ADD CONSTRAINT `besoins_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `besoins` ADD CONSTRAINT `besoins_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `categorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `candidatures` ADD CONSTRAINT `candidatures_besoinId_fkey` FOREIGN KEY (`besoinId`) REFERENCES `besoins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `candidatures` ADD CONSTRAINT `candidatures_prestataireId_fkey` FOREIGN KEY (`prestataireId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `candidatures` ADD CONSTRAINT `candidatures_professionId_fkey` FOREIGN KEY (`professionId`) REFERENCES `profession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profil_prestataire` ADD CONSTRAINT `profil_prestataire_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profil_prestataire` ADD CONSTRAINT `profil_prestataire_professionId_fkey` FOREIGN KEY (`professionId`) REFERENCES `profession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_besoinId_fkey` FOREIGN KEY (`besoinId`) REFERENCES `besoins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_candidatureId_fkey` FOREIGN KEY (`candidatureId`) REFERENCES `candidatures`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
