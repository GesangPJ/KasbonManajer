import dynamic from 'next/dynamic'

//Membuat komponen yang diimport menjadi dynamic page
const TabelAkun = dynamic(()=>import('@views/tabel-akun/TabelAkun'),  {ssr:false})

const DaftarAkun = () => {

  return (
    <div style={{ height: 400, width: '80%' }}>
      <h1>Tabel Daftar Akun</h1>
      <br />
      <TabelAkun/>
    </div>
  )
}

export default DaftarAkun
