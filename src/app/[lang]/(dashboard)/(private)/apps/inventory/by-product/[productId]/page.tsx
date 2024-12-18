import InventoryByProductId from "@/views/apps/inventory/detail/InventoryByProductId";

const InventoryDEtail = ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = params;

  console.log({ productId })

  return (
    <InventoryByProductId productId={productId} />
  )
}

export default InventoryDEtail
