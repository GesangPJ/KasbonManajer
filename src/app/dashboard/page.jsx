// Dashboard. Lokasi : /src/app/dashboard/page.jsx

'use client'

import { useSession } from 'next-auth/react'

// MUI
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

//Komponen
import TabelAdmin from '@/views/kasbon-admin/KasbonAdmin'
import TabelKaryawan from '@/views/kasbon-karyawan/KasbonKaryawan'

const DashboardAnalytics = () => {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  const isAdmin = session.user.userType === 'ADMIN'
  const isKaryawan = session.user.userType === 'KARYAWAN'

  return (
    <div>
      <Card>
        {isAdmin && (
          <CardHeader title="Dashboard Admin">
            <CardContent>
              <TabelAdmin/>
            </CardContent>
          </CardHeader>
        )}
      {isKaryawan && (
        <CardHeader title="Dashboard Karyawan">
          <CardContent>
            <TabelKaryawan/>
          </CardContent>
        </CardHeader>
      )}
      </Card>
    </div>
  )
}

export default DashboardAnalytics
