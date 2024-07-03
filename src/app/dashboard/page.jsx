// Dashboard. Lokasi : /src/app/dashboard/page.jsx

'use client'

import dynamic from 'next/dynamic'

import { useSession } from 'next-auth/react'

//Import Komponen dan pastikan komponen menjadi dynamic page
const TabelAdmin = dynamic(() => import('@/views/kasbon-admin/KasbonAdmin'), { ssr: false })
const TabelKaryawan = dynamic(() => import('@/views/kasbon-karyawan/KasbonKaryawan'), { ssr: false })

const DashboardAnalytics = () => {
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
