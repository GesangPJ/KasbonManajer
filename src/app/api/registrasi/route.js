
import prisma from '@prisma/client'

import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name, userType } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          userType,
        },
      })

      res.status(201).json(user)

    } catch (error) {
      res.status(400).json({ error: "User sudah ada" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
