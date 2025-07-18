-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `motDePasseHash` VARCHAR(255) NOT NULL,
    `nom` VARCHAR(255) NULL,
    `dateNaissance` DATE NULL,
    `telephone` VARCHAR(20) NULL,
    `sexe` ENUM('M', 'F') NULL,
    `ville` VARCHAR(100) NULL,
    `quartier` VARCHAR(100) NULL,
    `role` ENUM('client', 'prestataire', 'les_deux') NULL DEFAULT 'client',
    `creeLe` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `besoins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(255) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `categorie` ENUM('electricite', 'plomberie', 'garde_enfants', 'bricolage', 'service_entretien', 'cours_particuliers', 'demenagement', 'informatique') NOT NULL,
    `ville` VARCHAR(100) NOT NULL,
    `quartier` VARCHAR(100) NOT NULL,
    `dateRdv` DATETIME(3) NOT NULL,
    `budget` DOUBLE NOT NULL,
    `creeLe` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `candidatures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `besoinId` INTEGER NOT NULL,
    `prestataireId` INTEGER NOT NULL,
    `biographie` VARCHAR(191) NOT NULL,
    `professionId` INTEGER NOT NULL,
    `cni` VARCHAR(191) NOT NULL,
    `cv` VARCHAR(191) NULL,
    `attestation` VARCHAR(191) NULL,
    `budgetPropose` DOUBLE NOT NULL,
    `justificationBudget` VARCHAR(191) NULL,
    `statut` ENUM('envoyee', 'acceptee', 'refusee') NOT NULL DEFAULT 'envoyee',
    `creeLe` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `profession_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profil_prestataire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `professionId` INTEGER NOT NULL,
    `biographie` VARCHAR(191) NOT NULL,
    `experience` INTEGER NULL,
    `cni` VARCHAR(191) NOT NULL,
    `cv` VARCHAR(191) NULL,
    `attestation` VARCHAR(191) NULL,
    `statutValidation` ENUM('en_attente', 'valide', 'refuse') NOT NULL DEFAULT 'en_attente',
    `creeLe` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `profil_prestataire_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `type` ENUM('candidature', 'validation', 'refus', 'info') NOT NULL DEFAULT 'info',
    `lue` BOOLEAN NOT NULL DEFAULT false,
    `creeLe` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `besoinId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `candidatureId` INTEGER NOT NULL,
    `montant` DOUBLE NOT NULL,
    `motif` VARCHAR(255) NOT NULL,
    `statut` ENUM('en_attente', 'en_cours', 'payé', 'échoué') NOT NULL DEFAULT 'en_attente',
    `creeLe` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `transactions_candidatureId_key`(`candidatureId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `besoins` ADD CONSTRAINT `besoins_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
