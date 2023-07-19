-- CreateTable
CREATE TABLE `Challenge` (
    `id` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `prompt` VARCHAR(191) NOT NULL,
    `hints` JSON NOT NULL,
    `languageToWrite` VARCHAR(191) NOT NULL,
    `promptCode` JSON NOT NULL,
    `reactConfig` JSON NOT NULL,
    `solution` VARCHAR(191) NOT NULL,
    `difficulty` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
