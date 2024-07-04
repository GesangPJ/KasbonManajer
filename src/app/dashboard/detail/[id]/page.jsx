'use client'

import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

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

const DetailPage = () => {
  const params = useParams()
  const id = params.id

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
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
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!data) {
    return <div>Data tidak ditemukan</div>
  }

  return (
    <div>
      <h1>Detail Kasbon : {data.namaKaryawan} | ID Kasbon : {data.userId} </h1>
      <br />
      <p className='text-xl'>Nama: {data.namaKaryawan}</p>
      <p className='text-xl'>Jumlah: {data.jumlah}</p>
      <p className='text-xl'>Status Request: {data.status_r}</p>
      <p className='text-xl'>Status Bayar: {data.status_b}</p>
      <p className='text-xl'>Metode: {data.metode}</p>
      <p className='text-xl'>Keterangan: {data.keterangan}</p>
      <p className='text-xl'>Admin: {data.namaAdmin}</p>
      <p className='text-xl'>Tanggal Kasbon Dibuat: {formatDate(data.createdAt)}</p>
      <p className='text-xl'>Tanggal Kasbon Diperbarui: {formatDate(data.updatedAt)}</p>
    </div>
  )
}

export default DetailPage
