'use client'

import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

const DetailPage = () => {
  const params = useParams()
  const id = params.id

  // const { id } = router.query
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(`/api/detail-kasbon/${id}`)
          const data = await response.json()

          // const result = await response.json()

          // setData(result)

          setData(data)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching detail data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>Data tidak ditemukan</div>
  }

  return (
    <div>
      <h1>Detail Kasbon untuk {data.namaKaryawan} | {data.userId} </h1>
      <p>ID: {data.id}</p>
      <p>Nama: {data.namaKaryawan}</p>
      <p>Jumlah: {data.jumlah}</p>
      <p>Status Request: {data.status_r}</p>
      <p>Status Bayar: {data.status_b}</p>
      <p>Metode: {data.metode}</p>
      <p>Keterangan: {data.keterangan}</p>
      <p>Admin: {data.namaAdmin}</p>
      <p>Tanggal Kasbon Dibuat: {data.createdAt}</p>
      <p>Tanggal Kasbon Diperbarui: {data.updatedAt}</p>
    </div>
  )
}

export default DetailPage
