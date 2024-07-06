'use client'

import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const columns = [
  { field: 'no', headerName: 'No', width: 90 },
  { field: 'name', headerName: 'Nama', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
]

const TabelAkunAdmin = () => {
  const { data: session } = useSession()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/tabel-akun?userId=${session.user.id}`)
          const data = await response.json()
          const filteredData = data.filter(row => row.userType === 'ADMIN')

          // Tambahkan nomor urut
          const numberedData = filteredData.map((row, index) => ({ ...row, no: index + 1 }))

          setRows(numberedData)
          setLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData()
    }
  }, [session])

  return (
    <div className='max-w-[100%]'>
      <h2 className='font-bold'>
        Akun Admin
      </h2>
      <DataGrid
        rows={rows}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        slots={{ toolbar: GridToolbar }}
        columns={columns}
        pageSize={5}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        loading={loading}
        getRowId={(row) => row.id} // Tetap gunakan ID asli untuk identifikasi baris
      />
    </div>
  )
}

export default TabelAkunAdmin
