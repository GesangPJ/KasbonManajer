import { NextResponse } from 'next/server'

import { getServerSession } from "next-auth/next"

import { authOptions } from "../auth/[...nextauth]/route"

import prisma from '@/app/lib/prisma'


// GET /api/tabel-akun
export async function GET(req) {
  const session = await getServerSession(req, { req }, authOptions)

  if (!session) {
    console.log('Unauthorized Access : API Ambil Daftar Akun')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

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
