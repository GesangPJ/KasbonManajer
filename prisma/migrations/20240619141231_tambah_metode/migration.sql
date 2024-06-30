/*
  Warnings:

  - Made the column `status_b` on table `kasbon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `kasbon` ADD COLUMN `metode` ENUM('CASH', 'TRANSFER') NOT NULL DEFAULT 'CASH',
    MODIFY `status_b` ENUM('BELUM_LUNAS', 'SUDAH_Lunas') NOT NULL DEFAULT 'BELUM_LUNAS';
