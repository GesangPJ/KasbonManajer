import dynamic from 'next/dynamic'

import TabelAkunAdmin from '@/views/tabel-akun/TabelAdmin'

//Membuat komponen yang diimport menjadi dynamic page
const TabelAkun = dynamic(()=>import('@views/tabel-akun/TabelAkun'),  {ssr:false})


const DaftarAkun = () => {

  return (
    <div style={{ height: 400, width: '80%' }}>
      <h1>Tabel Daftar Akun</h1>
      <br />
      <TabelAkun/>
      <br />
      <TabelAkunAdmin/>
    </div>
  )
}

export default DaftarAkun
