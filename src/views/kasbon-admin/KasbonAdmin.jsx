'use client'

import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text
  }

  return text.slice(0, maxLength) + '...'
}

const getStatusChip = (status) => {
  switch (status) {
    case 'BELUM':
      return <Chip label="BELUM" color="warning" variant="outlined" icon= {<WarningAmberIcon/>} />
    case 'SETUJU':
      return <Chip label="SETUJU" color="success" variant="outlined" icon= {<CheckCircleOutlineIcon/>} />
    case 'TOLAK':
      return <Chip label="DITOLAK" color="error" variant="outlined"  icon= {<HighlightOffIcon/>} />
    default:
      return <Chip label="UNKNOWN" color="default" variant="outlined" />
  }
}

const getBayarChip = (status) => {
  switch (status) {
    case 'BELUM':
      return <Chip label="BELUM" color="error" variant="outlined" icon= {<ErrorOutlineIcon/>} />
    case 'LUNAS':
      return <Chip label="LUNAS" color="success" variant="outlined" icon= {<CheckCircleOutlineIcon/>} />
    default:
      return <Chip label="UNKNOWN" color="default" variant="outlined" />
  }
}

// Format Tanggal Indonesia
// const formatDate = (dateString) => {
//   if (!dateString) return 'Invalid Date'
//   const date = new Date(dateString)
//   const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }

//   return new Intl.DateTimeFormat('id-ID', options).format(date)
// }

const formatDate = (dateString) => {
  if (!dateString) return 'Invalid Date'
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}-${month}-${year} ${hours}:${minutes}`
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
    headerClassName:'app-theme--header',
    width: 150,
    renderCell: (params) => <div>{formatDate(params.value)}</div>,
  },{
    field: 'namaKaryawan',
    headerName: 'Nama',
    headerClassName:'app-theme--header',
    width: 160,
  },
  {
    field: 'jumlah',
    headerName: 'Jumlah',
    headerClassName:'app-theme--header',
    width: 100,
    renderCell: (params) => <div>{formatCurrency(params.value)}</div>,
  },
  {
    field: 'status_r',
    headerName: 'Status Request',
    headerClassName:'app-theme--header',
    width: 160,
    renderCell: (params) => getStatusChip(params.value),
  },
  {
    field: 'status_b',
    headerName: 'Status Bayar',
    headerClassName:'app-theme--header',
    width: 160,
    renderCell: (params) => getBayarChip(params.value),
  },
  { field: 'metode', headerName: 'Metode', width: 100 },
  {
    field: 'keterangan',
    headerName: 'Keterangan',
    headerClassName:'app-theme--header',
    width: 150,
    renderCell: (params) => <div>{truncateText(params.value, 40)}</div>,
  },
  {
    field: 'namaAdmin',
    headerName: 'Admin',
    headerClassName:'app-theme--header',
    width: 120,
  },
  {
    field: 'detail',
    headerName: 'Detail',
    headerClassName:'app-theme--header',
    width: 100,
    renderCell: (params) => (
      <Button variant="contained" color="primary">
        Detail
      </Button>
    ),
  },
]

const TabelAdmin = () => {
  const { data: session } = useSession()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/dashboard-admin`)
          const data = await response.json()

          // Tambahkan nomor urut
          const numberedData = data.map((row, index) => ({ ...row, no: index + 1 }))

          setRows(numberedData)
          setLoading(false)
        } catch (error) {
          console.error('Error mengambil data:', error)
        }
      }

      fetchData()
    }
  }, [session])

  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
        '& .app-theme--header': {
          fontWeight: 'bold',
          fontSize: '1.1rem', // Adjust as needed
        },
      }}
    >
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
    </Box>
  )
}

export default TabelAdmin
