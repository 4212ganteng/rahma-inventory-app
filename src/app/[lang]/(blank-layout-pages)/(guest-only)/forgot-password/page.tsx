// Next Imports
import type { Metadata } from 'next'



// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import ForgotPassword from '@/views/ForgotPassword'

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Forgotten Password to your account'
}

const ForgotPasswordPage = () => {
  // Vars
  const mode = getServerMode()

  return <ForgotPassword mode={mode} />
}

export default ForgotPasswordPage
