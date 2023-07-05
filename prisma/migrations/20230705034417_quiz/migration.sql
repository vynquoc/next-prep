/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Question`;

-- CreateTable
CREATE TABLE `Quiz` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `prompt` VARCHAR(191) NOT NULL,
    `kind` ENUM('single', 'multiple') NOT NULL DEFAULT 'multiple',
    `choices` JSON NOT NULL,
    `correctAnswer` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
