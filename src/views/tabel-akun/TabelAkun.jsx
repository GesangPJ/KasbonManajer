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

const TabelAkun = ({ initialData }) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (initialData) {
      setRows(initialData)
      setLoading(false)
    }
  }, [initialData])

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
        getRowId={(row) => row.id}
      />
    </div>
  )
}

export default TabelAkun
