// src/apps/api/auth/login/route.js

import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import prisma from '@/app/lib/prisma';

export const POST = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email atau password tidak boleh kosong' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error during login:', error); // Logging the error for debugging purposes

    return NextResponse.json({ error: 'Terjadi kesalahan saat memproses permintaan' }, { status: 500 });
  }
};
