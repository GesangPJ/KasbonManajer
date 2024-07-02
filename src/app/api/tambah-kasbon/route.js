// Tambah Kasbon API. Lokasi : /src/app/api/tambah-kasbon/route.js

import { NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'

export const POST = async (req) => {
  try {
    const { userId, jumlah, keterangan } = await req.json()

    // Ambil tanggal dan waktu saat ini
    const now = new Date()
    const createdAt = now.toISOString() // menggunakan format ISO untuk datetime
    const status_r = 'BELUM'
    const status_b = 'BELUM'

    try {
      const kasbon = await prisma.kasbon.create({
        data: {
          userId,
          jumlah,
          status_r,
          status_b,
          keterangan,
          metode: metode.toUpperCase(),
          createdAt,
          updatedAt: createdAt, // updatedAt diatur dengan nilai yang sama dengan createdAt
        },
      })

      return NextResponse.json(kasbon, { status: 201 })
    } catch (error) {
      return NextResponse.json({ error: "Kasbon sudah ada" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan saat memproses permintaan." }, { status: 500 })
  }
}
