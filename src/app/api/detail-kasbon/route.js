// API Detail Kasbon. Lokasi : /src/app/api/detail-kasbon
// API untuk menampilkan detail dari kasbon

import { NextResponse } from "next/server"

import prisma from "@/app/lib/prisma"

export async function GET(req) {
  const url = new URL(req.url)
  const id = url.searchParams.get("id")

  try {
    if (!id) {
      return NextResponse.json({ error: "Parameter id tidak ditemukan" }, { status: 400 })
    }

    const kasbon = await prisma.kasbon.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: { select: { name: true } },
        admin: { select: { name: true } }
      }
    })

    if (!kasbon) {
      return NextResponse.json({ error: "Kasbon tidak ditemukan" }, { status: 404 })
    }

    const formattedKasbon = {
      ...kasbon,
      createdAt: kasbon.createdAt.toISOString(),
      updatedAt: kasbon.updatedAt.toISOString(),
      namaKaryawan: kasbon.user?.name || "-",
      namaAdmin: kasbon.admin?.name || "-"
    }

    console.log("Detail Kasbon", formattedKasbon)

    return NextResponse.json(formattedKasbon, { status: 200 })
  } catch (error) {
    console.error("Error mengambil data Kasbon", error)

    return NextResponse.json({ error: "Terjadi kesalahan saat mengambil data kasbon" }, { status: 500 })
  }
}
