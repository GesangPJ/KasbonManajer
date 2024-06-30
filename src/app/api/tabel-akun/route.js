import { NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'


// GET /api/tabel-akun
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data akun' }, { status: 500 })
  }
}
