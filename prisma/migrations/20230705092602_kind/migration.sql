-- AlterTable
ALTER TABLE `Quiz` MODIFY `kind` ENUM('single', 'multiple') NOT NULL DEFAULT 'single';
