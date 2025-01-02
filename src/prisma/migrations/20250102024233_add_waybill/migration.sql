-- CreateTable
CREATE TABLE `Waybill` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `inventoryEntryId` VARCHAR(191) NOT NULL,
    `waybillDate` DATETIME(3) NOT NULL,
    `status` ENUM('PENAMBAHAN', 'PENGURANGAN') NOT NULL DEFAULT 'PENAMBAHAN',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Waybill` ADD CONSTRAINT `Waybill_inventoryEntryId_fkey` FOREIGN KEY (`inventoryEntryId`) REFERENCES `InventoryEntry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Waybill` ADD CONSTRAINT `Waybill_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
