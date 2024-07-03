// Dashboard. Lokasi : /src/app/dashboard/page.jsx

import { useSession } from 'next-auth/react'

import TabelAdmin from '@/views/kasbon-admin/KasbonAdmin'
import TabelKaryawan from '@/views/kasbon-karyawan/KasbonKaryawan'

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
    const response = await fetch(`/api/dashboard-admin`)
    const data = await response.json()

    return {
      props: {
        initialData: data,
      },
    }
  } catch (error) {
    console.error('Error mengambil data:', error)

    return {
      notFound: true,
    }
  }
}

const DashboardPage = ({ initialData }) => {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  const isAdmin = session.user.userType === 'ADMIN'
  const isKaryawan = session.user.userType === 'KARYAWAN'

  return (
    <div style={{ height: 400, width: '100%' }}>
      {isAdmin && (
        <div>
          <h1>Dashboard Admin</h1>
          <br />
          <TabelAdmin initialData={initialData} />
        </div>
      )}
      {isKaryawan && (
        <div>
          <h1>Dashboard Karyawan</h1>
          <br />
          <TabelKaryawan/>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
