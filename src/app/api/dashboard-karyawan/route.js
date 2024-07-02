import { NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID tidak ditemukan' }, { status: 400 })
  }

  try {
    const kasbons = await prisma.kasbon.findMany({
      where: {
        userId: parseInt(userId),
      },
      select: {
        id: true,
        jumlah: true,
        status_r: true,
        status_b: true,
        keterangan: true,
        metode: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // Konversi tanggal ke format ISO
    const formattedKasbons = kasbons.map(kasbon => ({
      ...kasbon,
      createdAt: kasbon.createdAt.toISOString(),
      updatedAt: kasbon.updatedAt.toISOString(),
    }))

    return NextResponse.json(formattedKasbons, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data kasbon' }, { status: 500 })
  }
}
