// Component Imports
import Register from '@/views/Register'
import Providers from '@components/Providers'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const Registrasi = () => {
  // Vars
  const mode = getServerMode()
  const direction = 'ltr'

  return(
    <Providers direction={direction}>
      <Register mode={mode} />
    </Providers>
)
}

export default Registrasi
