import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '../../../lib/prisma'

const authHandler: NextApiHandler = (req: any, res: any) =>
  NextAuth(req, res, options)

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      session.user.userId = user.id

      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
}

export default authHandler
