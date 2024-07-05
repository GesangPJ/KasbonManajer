// Dashboard. Lokasi : /src/app/dashboard/page.jsx

'use client'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

//Import Komponen dan pastikan komponen menjadi dynamic page
import TabelAdmin from '@/views/kasbon-admin/KasbonAdmin'
import TabelKaryawan from '@/views/kasbon-karyawan/KasbonKaryawan'

const DashboardAnalytics = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    router.push('/error/401')

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
            <TabelAdmin/>
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

export default DashboardAnalytics
