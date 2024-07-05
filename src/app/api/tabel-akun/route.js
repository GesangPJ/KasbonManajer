import { NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

import prisma from '@/app/lib/prisma'


// GET /api/tabel-akun
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    console.log('Unauthorized Access : API Tabel Akun')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  if (!userId) {
    return NextResponse.json({ error: 'User ID tidak ditemukan' }, { status: 400 })
  }

  console.log(userId)

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
