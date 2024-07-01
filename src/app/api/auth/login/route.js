// src/app/api/auth/login/route.js

import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import prisma from '@/app/lib/prisma';

export const POST = async (req, res) => {
  try {
    const { email, password } = req.body; // Pastikan req.body mengandung email dan password

    if (!email || !password) {
      return NextResponse.json({ error: 'Email atau password tidak boleh kosong' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }, // Pastikan email diteruskan dengan benar
    });

    // Check if user exists and password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Respond with the token
    return NextResponse.json({ token });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Terjadi kesalahan saat memproses permintaan' }, { status: 500 });
  }
};
