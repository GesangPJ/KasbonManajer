// src/pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcryptjs'

import prisma from '@/app/lib/prisma'



export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user
        }

        return null
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }

      return token
    },
    async session(session, token) {
      session.user.id = token.id
      session.user.email = token.email

      return session
    }
  }
})
