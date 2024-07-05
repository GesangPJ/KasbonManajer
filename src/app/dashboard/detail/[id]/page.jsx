'use client'



import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'

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

const DetailPage = () => {
  const params = useParams()
  const id = params.id
  const {data: session, status} = useSession()
  const router = useRouter()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (status === 'loading') return // Jangan lakukan apa pun saat sesi sedang dimuat

    if (!session) {
      router.push('/error/401')
    }

    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(`/api/detail-kasbon?id=${id}`)

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }

          const contentType = response.headers.get('content-type')

          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Received non-JSON response')
          }

          const result = await response.json()

          setData(result)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching detail data:', error)
        setError(error.message)
        setLoading(false)
      }
    }



    fetchData()
  }, [id, session, status, router])

  if (!session) {
    return null
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!data) {
    return <div>Data tidak ditemukan</div>
  }

  const rows = [
    { label: 'ID Kasbon', value: data.id },
    { label: 'ID Karyawan', value: data.userId },
    { label: 'Nama', value: data.namaKaryawan },
    { label: 'Jumlah', value: formatCurrency(data.jumlah) },
    { label: 'Status Request', value: data.status_r },
    { label: 'Status Bayar', value: data.status_b },
    { label: 'Metode Pembayaran', value: data.metode },
    { label: 'Keterangan', value: data.keterangan },
    { label: 'Nama Admin', value: data.namaAdmin },
    { label: 'Tanggal Kasbon Dibuat', value: formatDate(data.createdAt) },
    { label: 'Tanggal Kasbon Diperbarui', value: formatDate(data.updatedAt) },
  ]

  return (
    <div>
      <h1>Detail Kasbon : {data.namaKaryawan} | ID : {data.userId} </h1>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="Detail Kasbon">
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" className='text-xl'>
                  {row.label}
                </TableCell>
                <TableCell className='text-xl'>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button variant='contained' color="primary" href="/dashboard" size="large">
        &laquo; Dashboard
      </Button>
    </div>
  )
}

export default DetailPage
