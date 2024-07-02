'use client'

import { useSession } from 'next-auth/react'

import Grid from '@mui/material/Grid'

const DashboardAnalytics = () => {
  const { data: session } = useSession()

  return (
    <div>

      <Grid container spacing={6}>
      <h1>Halaman Dashboard Utama</h1>
      {session && (
          <div>
            <p>Nama : {session.user.name}</p>
            <p>Email: {session.user.email}</p>
            <p>Tipe Akun : {session.user.userType}</p>
          </div>
        )}
      </Grid>
    </div>
  )
}

export default DashboardAnalytics
