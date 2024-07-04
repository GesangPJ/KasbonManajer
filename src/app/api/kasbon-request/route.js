// API Kasbon Request. Lokasi : /src/app/api/kasbon-request
// Untuk mengambil data kasbon dengan request "BELUM"

import { NextResponse } from "next/server"

import prisma from "@/app/lib/prisma"

export async function GET(req){
  const {searchParams} = new URL(re.url)
  const userId = searchParams.get('userId')
  const statusR = "BELUM"

  if(!userId){
    return NextResponse.json({error:'User ID tidak ditemukan'}, {status : 400})
  }

  console.log(userId)

  try{
    const kasbons = await prisma.kasbon.findMany({
      where:{
        status_r: statusR,
      },
      select:{
        id:true,
        userId:true,
        jumlah:true,
        status_b:true,
        keterangan:true,
        metode:true,
        updatedAt:true,
        user:{
          select:{
            name:true,
          }
        }
      },
    })

    const formattedKasbons = kasbons.map(kasbon=>({
      ...kasbon,
      createdAt: kasbon.createdAt.toISOString(),
      updatedAt: kasbon.updatedAt.toISOString(),
      namaKaryawan: kasbon.user?.name || '-',
    }))

    return NextResponse.json(formattedKasbons, {status: 200})
  }
  catch (error){
    return NextResponse.json({error:'Ada kesalahan ketika mengembil data Kasbon'}, {status:500})
  }




}
