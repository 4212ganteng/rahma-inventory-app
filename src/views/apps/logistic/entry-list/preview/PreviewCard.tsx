// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import Logo from '@components/layout/shared/Logo'

// Style Imports
import type { LogisticResponData } from '@/types/apps/LogisticType'
import tableStyles from '@core/styles/table.module.css'
import './print.css'


const PreviewCard = ({ previewData }: { previewData: LogisticResponData[] }) => {

  const total = previewData?.reduce((acc, item) => acc + item.stockChange.quantity, 0)

  return (
    <Card className='previewCard'>
      <CardContent className='sm:!p-12'>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <div className='p-6 bg-actionHover rounded'>
              <div className='flex justify-between gap-y-4 flex-col sm:flex-row'>
                <div className='flex flex-col gap-6'>
                  <div className='flex items-center gap-2.5'>
                    <Logo />
                  </div>
                  <div>
                    <Typography color='text.primary'>INVITE - Inventory Information Technology</Typography>
                    <Typography color='text.primary'>Jl. Kenanga, Krajan, Bergas Kidul, Kec. Bergas, Kabupaten Semarang, Jawa Tengah 50552</Typography>
                    <Typography color='text.primary'>( +62 ) 895-1322-2304</Typography>
                  </div>
                </div>
                <div className='flex flex-col gap-6'>
                  <Typography variant='h5' className='uppercase'>{`#${previewData[0]?.waybillNumber}`}</Typography>
                  <div className='flex flex-col gap-1'>
                    <Typography color='text.primary'>{`Date Issued: ${new Date(previewData[0]?.waybillDate).toLocaleDateString()}`}</Typography>
                    <Typography color='text.primary'>{`Type: ${previewData[0]?.status}`}</Typography>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          {/* <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Invoice To:
                  </Typography>
                  <div>
                    <Typography>{invoiceData?.name}</Typography>
                    <Typography>{invoiceData?.company}</Typography>
                    <Typography>{invoiceData?.address}</Typography>
                    <Typography>{invoiceData?.contact}</Typography>
                    <Typography>{invoiceData?.companyEmail}</Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Bill To:
                  </Typography>
                  <div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Total Due:</Typography>
                      <Typography>$12,110.55</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Bank name:</Typography>
                      <Typography>American Bank</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Country:</Typography>
                      <Typography>United States</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>IBAN:</Typography>
                      <Typography>ETD95476213874685</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>SWIFT code:</Typography>
                      <Typography>BR91905</Typography>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid> */}
          <Grid item xs={12}>
            <div className='overflow-x-auto border rounded'>
              <table className={tableStyles.table}>
                <thead className='border-bs-0'>
                  <tr>
                    <th className='!bg-transparent'>Item</th>
                    <th className='!bg-transparent'>SKU</th>
                    <th className='!bg-transparent'>Description</th>
                    <th className='!bg-transparent'>Batch Number</th>
                    <th className='!bg-transparent'>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Typography color='text.primary'>{item.stockChange?.inventoryEntry?.product?.name}</Typography>
                      </td>
                      <td>
                        <Typography color='text.primary'>{item.stockChange?.inventoryEntry?.product?.sku}</Typography>
                      </td>
                      <td>
                        <Typography color='text.primary'>{item.stockChange?.description}</Typography>
                      </td>
                      <td>
                        <Typography color='text.primary'>{item.stockChange?.inventoryEntry?.batchNumber}</Typography>
                      </td>

                      <td>
                        <Typography color='text.primary'>{item.stockChange?.quantity}</Typography>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='flex justify-between flex-col gap-y-4 sm:flex-row'>
              <div className='flex flex-col gap-1 order-2 sm:order-[unset]'>
                {/* <div className='flex items-center gap-2'>
                  <Typography className='font-medium' color='text.primary'>
                    Salesperson:
                  </Typography>
                  <Typography>Tommy Shelby</Typography>
                </div>
                <Typography>Thanks for your business</Typography> */}
              </div>
              <div className='min-is-[200px]'>

                <div className='flex items-center justify-between'>
                  <Typography>Total:</Typography>
                  <Typography className='font-medium' color='text.primary'>
                    {total}
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Divider className='border-dashed' />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <Typography component='span' className='font-medium' color='text.primary'>
                Note:
              </Typography>{' '}
              Metode FIFO digunakan untuk mengelola persediaan barang yang keluar berdasarkan urutan kedatangan barang pertama kali (batch yang lebih tua akan keluar lebih dulu).
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PreviewCard
