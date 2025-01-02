import PreviewEntry from "@/views/apps/logistic/entry-list/preview"

const IncomingGoodsPreview = ({ params }: { params: { id: string } }) => {
  console.log("whta is id", params.id)

  return (
    <PreviewEntry id={params.id} />
  )
}

export default IncomingGoodsPreview
