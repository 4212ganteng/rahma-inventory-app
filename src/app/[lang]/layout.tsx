// Next Imports
import { headers } from 'next/headers'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'
import NextTopLoader from 'nextjs-toploader';


// Type Imports
import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports

// HOC Imports
import TranslationWrapper from '@/hocs/TranslationWrapper'

// Config Imports
import { i18n } from '@configs/i18n'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

export const dynamic = "force-dynamic"

export const metadata = {
  title: 'INVITE - Inventory Information Technology',
  description:
    'INVITE - Inventory Information Technology adalah aplikasi manajemen inventaris berbasis teknologi yang dirancang untuk mempermudah proses pengelolaan stok barang dengan sistem FIFO (First In, First Out). Aplikasi ini membantu perusahaan dalam memantau pergerakan barang, memastikan barang yang pertama kali masuk adalah yang pertama kali keluar, serta memberikan laporan yang akurat terkait status inventaris.'
}

const RootLayout = ({ children, params }: ChildrenType & { params: { lang: Locale } }) => {
  // Vars
  const headersList = headers()
  const direction = i18n.langDirection[params.lang]

  return (
    <TranslationWrapper headersList={headersList} lang={params.lang}>
      <html id='__next' lang={params.lang} dir={direction}>
        <body className='flex is-full min-bs-full flex-auto flex-col'>
          <NextTopLoader />
          {children}</body>
      </html>
    </TranslationWrapper>
  )
}

export default RootLayout
