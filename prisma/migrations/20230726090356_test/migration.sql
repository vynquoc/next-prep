-- DropForeignKey
ALTER TABLE `QuizSubmission` DROP FOREIGN KEY `QuizSubmission_userId_fkey`;

-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_userId_fkey`;
