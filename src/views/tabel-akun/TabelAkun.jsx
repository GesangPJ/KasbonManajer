'use client'

import React, { useEffect, useState } from 'react'

import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'

const columns = [
  { field: 'no', headerName: 'No', width: 90 },
  { field: 'name', headerName: 'Nama', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'userType', headerName: 'Tipe Akun', width: 150 },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 100,
    renderCell: (params) => (
      <Button variant="contained" color="primary">
        Edit
      </Button>
    ),
  },
]

const TabelAkun = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/tabel-akun')
        const data = await response.json()

        // Tambahkan nomor urut
        const numberedData = data.map((row, index) => ({ ...row, no: index + 1 }))

        setRows(numberedData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div style={{ height: 400, width: '80%' }}>
      <DataGrid
        rows={rows}
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

export default TabelAkun
