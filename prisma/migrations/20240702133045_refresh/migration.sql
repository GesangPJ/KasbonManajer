/*
  Warnings:

  - You are about to alter the column `status_b` on the `kasbon` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - You are about to alter the column `metode` on the `kasbon` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `kasbon` DROP FOREIGN KEY `Kasbon_adminId_fkey`;

-- AlterTable
ALTER TABLE `kasbon` MODIFY `adminId` INTEGER NULL,
    MODIFY `status_b` VARCHAR(191) NULL,
    ALTER COLUMN `createdAt` DROP DEFAULT,
    MODIFY `metode` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Kasbon` ADD CONSTRAINT `Kasbon_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
