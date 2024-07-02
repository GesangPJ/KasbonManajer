'use client'

import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import Chip from '@mui/material/Chip'

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text
  }

  return text.slice(0, maxLength) + '...'
}

const getStatusChip = (status) => {
  switch (status) {
    case 'BELUM':
      return <Chip label="BELUM" color="warning" />
    case 'SETUJU':
      return <Chip label="SETUJU" color="success" />
    case 'TOLAK':
      return <Chip label="DITOLAK" color="error" />
    default:
      return <Chip label="UNKNOWN" color="default" />
  }
}

const getBayarChip = (status) => {
  switch (status) {
    case 'BELUM':
      return <Chip label="BELUM" color="error" />
    case 'LUNAS':
      return <Chip label="LUNAS" color="success" />
    default:
      return <Chip label="UNKNOWN" color="default" />
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Invalid Date'
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }

  return new Intl.DateTimeFormat('id-ID', options).format(date)
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

const columns = [
  { field: 'no', headerName: 'No', width: 50 },
  {
    field: 'updatedAt',
    headerName: 'Tanggal/Jam',
    width: 200,
    renderCell: (params) => <div>{formatDate(params.value)}</div>,
  },
  {
    field: 'jumlah',
    headerName: 'Jumlah',
    width: 100,
    renderCell: (params) => <div>{formatCurrency(params.value)}</div>,
  },
  {
    field: 'status_r',
    headerName: 'Status Request',
    width: 120,
    renderCell: (params) => getStatusChip(params.value),
  },
  {
    field: 'status_b',
    headerName: 'Status Bayar',
    width: 120,
    renderCell: (params) => getBayarChip(params.value),
  },
  { field: 'metode', headerName: 'Metode', width: 100 },
  {
    field: 'keterangan',
    headerName: 'Keterangan',
    width: 150,
    renderCell: (params) => <div>{truncateText(params.value, 40)}</div>,
  },
  {
    field: 'edit',
    headerName: 'Detail',
    width: 100,
    renderCell: (params) => (
      <Button variant="contained" color="primary">
        Detail
      </Button>
    ),
  },
]

const TabelKaryawan = () => {
  const { data: session } = useSession()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/dashboard-karyawan?userId=${session.user.id}`)
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
    }
  }, [session])

  return (
    <div style={{ height: 400, width: '100%' }}>
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

export default TabelKaryawan
