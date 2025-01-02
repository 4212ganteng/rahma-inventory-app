import PreviewEntry from "@/views/apps/logistic/entry-list/preview"

const OutGoingGoods = ({ params }: { params: { id: string } }) => {
  return (
    <PreviewEntry id={params.id} />
  )
}

export default OutGoingGoods
