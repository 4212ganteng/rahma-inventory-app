
// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'



const PreviewActions = ({ onButtonClick }: { onButtonClick: () => void }) => {


  return (
    <>
      <Card>
        <CardContent className='flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <Button fullWidth color='secondary' variant='tonal' className='capitalize' onClick={onButtonClick}>
              Download PDF
            </Button>

          </div>
          <div className='flex items-center gap-4'>
            <Button fullWidth color='primary' variant='tonal' className='capitalize' onClick={onButtonClick}>
              Print
            </Button>

          </div>

        </CardContent>
      </Card>

    </>
  )
}

export default PreviewActions
