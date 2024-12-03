/*
  Warnings:

  - You are about to drop the column `purchaseDetailId` on the `inventoryentry` table. All the data in the column will be lost.
  - You are about to drop the column `unitCost` on the `inventoryentry` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `inventoryentry` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Enum(EnumId(1))`.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchasedetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchaseorder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salesdetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salesorder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplier` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[batchNumber]` on the table `InventoryEntry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fifoSequence` to the `InventoryEntry` table without a default value. This is not possible if the table is not empty.
  - Made the column `expiryDate` on table `inventoryentry` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `inventoryentry` DROP FOREIGN KEY `InventoryEntry_purchaseDetailId_fkey`;

-- DropForeignKey
ALTER TABLE `purchasedetail` DROP FOREIGN KEY `PurchaseDetail_productId_fkey`;

-- DropForeignKey
ALTER TABLE `purchasedetail` DROP FOREIGN KEY `PurchaseDetail_purchaseOrderId_fkey`;

-- DropForeignKey
ALTER TABLE `purchaseorder` DROP FOREIGN KEY `PurchaseOrder_supplierId_fkey`;

-- DropForeignKey
ALTER TABLE `salesdetail` DROP FOREIGN KEY `SalesDetail_inventoryEntryId_fkey`;

-- DropForeignKey
ALTER TABLE `salesdetail` DROP FOREIGN KEY `SalesDetail_productId_fkey`;

-- DropForeignKey
ALTER TABLE `salesdetail` DROP FOREIGN KEY `SalesDetail_salesOrderId_fkey`;

-- DropForeignKey
ALTER TABLE `salesorder` DROP FOREIGN KEY `SalesOrder_customerId_fkey`;

-- AlterTable
ALTER TABLE `inventoryentry` DROP COLUMN `purchaseDetailId`,
    DROP COLUMN `unitCost`,
    ADD COLUMN `fifoSequence` INTEGER NOT NULL,
    MODIFY `expiryDate` DATETIME(3) NOT NULL,
    MODIFY `status` ENUM('TERSEDIA', 'HAMPIR_HABIS', 'KADALUWARSA', 'KOSONG') NOT NULL DEFAULT 'TERSEDIA';

-- DropTable
DROP TABLE `customer`;

-- DropTable
DROP TABLE `purchasedetail`;

-- DropTable
DROP TABLE `purchaseorder`;

-- DropTable
DROP TABLE `salesdetail`;

-- DropTable
DROP TABLE `salesorder`;

-- DropTable
DROP TABLE `supplier`;

-- CreateTable
CREATE TABLE `StockChange` (
    `id` VARCHAR(191) NOT NULL,
    `inventoryEntryId` VARCHAR(191) NOT NULL,
    `changeType` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `changeDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `InventoryEntry_batchNumber_key` ON `InventoryEntry`(`batchNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_name_key` ON `Product`(`name`);

-- AddForeignKey
ALTER TABLE `StockChange` ADD CONSTRAINT `StockChange_inventoryEntryId_fkey` FOREIGN KEY (`inventoryEntryId`) REFERENCES `InventoryEntry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
