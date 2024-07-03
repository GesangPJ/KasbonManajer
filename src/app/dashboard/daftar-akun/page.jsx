import React from 'react'

import { useSession } from 'next-auth/react'

import TabelAkun from '@/views/tabel-akun/TabelAkun' // Impor komponen secara langsung



export async function getServerSideProps(context) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = await useSession()

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  try {
    const response = await fetch('/api/tabel-akun')
    const data = await response.json()

    return {
      props: {
        initialData: data,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)

    return {
      notFound: true,
    }
  }
}

const DaftarAkun = ({ initialData }) => {
  const { data: session } = useSession()

  if (!session) {
    return null // or redirect to login page
  }

  return (
    <div style={{ height: 400, width: '80%' }}>
      <h1>Tabel Daftar Akun</h1>
      <br />
      <TabelAkun initialData={initialData} />
    </div>
  )
}

export default DaftarAkun
