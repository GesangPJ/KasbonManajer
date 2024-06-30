// Component Imports
import Register from '@/views/Register'
import Providers from '@components/Providers'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'


const RegistrasiAkun = () =>{
   // Vars
const mode = getServerMode()
const direction = 'ltr'

  return(
    <div>
      Halaman Registrasi Akun Pengguna
      <Providers direction={direction}>
      <Register mode={mode} />
    </Providers>
    </div>
  )
}

export default RegistrasiAkun
