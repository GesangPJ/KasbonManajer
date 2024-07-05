import dynamic from 'next/dynamic'

import TabelAkunAdmin from '@/views/tabel-akun/TabelAdmin'

//Membuat komponen yang diimport menjadi dynamic page
const TabelAkun = dynamic(()=>import('@views/tabel-akun/TabelAkun'),  {ssr:false})


const DaftarAkun = () => {

  return (
<div className="">
      <h1>Tabel Daftar Akun</h1>
      <br />
      <div className="">
        <TabelAkun/>
      </div>
      <br />
      <div className="">
        <TabelAkunAdmin/>
      </div>
      <br />
    </div>
  )
}

export default DaftarAkun
