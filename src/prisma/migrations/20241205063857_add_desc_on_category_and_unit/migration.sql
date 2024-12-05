/*
  Warnings:

  - Added the required column `statusActive` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusActive` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `statusActive` ENUM('Active', 'Inactive') NOT NULL;

-- AlterTable
ALTER TABLE `unit` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `statusActive` ENUM('Active', 'Inactive') NOT NULL;
