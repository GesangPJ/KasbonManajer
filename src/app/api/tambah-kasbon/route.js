import { NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'

export const POST = async (req) => {
  try {
    const { userId, jumlah, keterangan } = await req.json()

    const createdAt = ''

    try {
      const kasbon = await prisma.kasbon.create({
        data: {
          userId,
          jumlah,
          keterangan,
          metode: metode.toUpperCase(),
          createdAt,},
      });

      return NextResponse.json(kasbon, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Kasbon sudah ada" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan saat memproses permintaan." }, { status: 500 });
  }
}
