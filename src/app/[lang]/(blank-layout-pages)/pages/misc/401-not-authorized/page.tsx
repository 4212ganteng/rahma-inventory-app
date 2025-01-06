// Component Imports


// Server Action Imports
import NotAuthorized from '@/views/NotAuthorized'
import { getServerMode } from '@core/utils/serverHelpers'

const Error401 = () => {
  // Vars
  const mode = getServerMode()

  return <NotAuthorized mode={mode} />
}

export default Error401
