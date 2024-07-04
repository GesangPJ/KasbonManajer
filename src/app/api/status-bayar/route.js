// API Status Request. Lokasi : /src/app/api/status-request
// API untuk ganti (PUT) status request

import { NextResponse } from "next/server"

import prisma from "@/app/lib/prisma"

export const PUT = async (req) => {
  try {
    const { adminId, status_b, kasbonId } = await req.json()

    if (!adminId || !status_b || !kasbonId) {
      return NextResponse.json({ error: "Data tidak boleh kosong" }, { status: 400 })
    }

    const now = new Date()
    const updatedAt = now.toISOString()

    try {
      const kasbon = await prisma.kasbon.update({
        where: { id: kasbonId },
        data: {
          status_b: status_b,
          adminId : adminId,
          updatedAt: updatedAt,
        },
      })

      return NextResponse.json({ message: "Status berhasil diperbarui", kasbon }, { status: 200 })
    } catch (error) {
      console.error("Error updating kasbon:", error)

      return NextResponse.json({ error: "Ada kesalahan ketika memperbarui status" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error parsing request body:", error)

    return NextResponse.json({ error: "Bad Request" }, { status: 400 })
  }
}
