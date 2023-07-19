-- AlterTable
ALTER TABLE `Challenge` MODIFY `category` VARCHAR(191) NULL,
    MODIFY `type` VARCHAR(191) NULL,
    MODIFY `slug` VARCHAR(191) NULL,
    MODIFY `prompt` VARCHAR(191) NULL,
    MODIFY `hints` JSON NULL,
    MODIFY `languageToWrite` VARCHAR(191) NULL,
    MODIFY `promptCode` JSON NULL,
    MODIFY `reactConfig` JSON NULL,
    MODIFY `solution` VARCHAR(191) NULL,
    MODIFY `difficulty` VARCHAR(191) NULL;
