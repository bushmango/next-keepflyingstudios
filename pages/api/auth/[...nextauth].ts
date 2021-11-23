import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import EmailProvider from 'next-auth/providers/email'

// import GoogleProvider from 'next-auth/providers/google'
require('dotenv').config()

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prismaClient } from '../../../lib/prisma'

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prismaClient),
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: process.env.AUTH_EMAIL_SERVER,
      from: process.env.AUTH_EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || '',
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    // }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken
      console.log('session', token, user)
      session.user_id = user.id
      session.user_access_token = user.custom_access_token
      return session
    },
  },
})
