import InventoryByProductId from "@/views/apps/inventory/detail/InventoryByProductId";

const InventoryDEtail = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;

  console.log({ productId })

  return (
    <InventoryByProductId productId={productId} />
  )
}

export default InventoryDEtail
