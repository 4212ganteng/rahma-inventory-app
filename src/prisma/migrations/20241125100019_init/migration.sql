/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('SALESPERSON', 'MASTERSUHU') NOT NULL DEFAULT 'SALESPERSON';

-- CreateTable
CREATE TABLE `Lead` (
    `id` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL DEFAULT '',
    `industry` VARCHAR(191) NOT NULL DEFAULT '',
    `picFirstName` VARCHAR(191) NOT NULL DEFAULT '',
    `picLastName` VARCHAR(191) NOT NULL DEFAULT '',
    `picEmail` VARCHAR(191) NOT NULL DEFAULT '',
    `picPhone` VARCHAR(191) NOT NULL DEFAULT '',
    `legalEntity` VARCHAR(191) NOT NULL DEFAULT '',
    `leadSource` VARCHAR(191) NOT NULL DEFAULT '',
    `leadStatus` VARCHAR(191) NOT NULL DEFAULT '',
    `city` VARCHAR(191) NOT NULL DEFAULT '',
    `province` VARCHAR(191) NOT NULL DEFAULT '',
    `address` VARCHAR(191) NOT NULL DEFAULT '',
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activity` (
    `id` VARCHAR(191) NOT NULL,
    `leadId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `activityType` VARCHAR(191) NOT NULL,
    `activityDate` DATETIME(3) NOT NULL,
    `activityNote` VARCHAR(191) NOT NULL,
    `latLongStart` VARCHAR(191) NOT NULL,
    `latLongFinish` VARCHAR(191) NOT NULL,
    `timeStart` DATETIME(3) NOT NULL,
    `timeFinish` DATETIME(3) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `stageOfSale` VARCHAR(191) NOT NULL,
    `dealName` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `statusProgress` ENUM('INITIAL', 'INPROGRESS', 'COMPLETED') NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
