/*
  Warnings:

  - You are about to drop the column `inventoryEntryId` on the `waybill` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `waybill` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `waybill` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[waybillNumber]` on the table `Waybill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stockChangeId` to the `Waybill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `waybill` DROP FOREIGN KEY `Waybill_inventoryEntryId_fkey`;

-- DropForeignKey
ALTER TABLE `waybill` DROP FOREIGN KEY `Waybill_productId_fkey`;

-- AlterTable
ALTER TABLE `waybill` DROP COLUMN `inventoryEntryId`,
    DROP COLUMN `productId`,
    DROP COLUMN `quantity`,
    ADD COLUMN `stockChangeId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Waybill_waybillNumber_key` ON `Waybill`(`waybillNumber`);

-- AddForeignKey
ALTER TABLE `Waybill` ADD CONSTRAINT `Waybill_stockChangeId_fkey` FOREIGN KEY (`stockChangeId`) REFERENCES `StockChange`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
