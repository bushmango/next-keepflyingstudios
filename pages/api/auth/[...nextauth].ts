import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import EmailProvider from 'next-auth/providers/email'

// import GoogleProvider from 'next-auth/providers/google'
require('dotenv').config()

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prismaClient } from '../../../lib/prisma'

const namespace = 'next-auth'
const allowNonSameSiteCookies = true

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
      console.log(namespace, 'session', user?.id)
      session.user_id = user.id
      session.user_access_token = user.custom_access_token
      return session
    },
  },
  // see: https://next-auth.js.org/configuration/options#usesecurecookies
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'none',
  //       path: '/',
  //       secure: true,
  //     },
  //   },
  //   callbackUrl: {
  //     name: `__Secure-next-auth.callback-url`,
  //     options: {
  //       sameSite: 'none',
  //       path: '/',
  //       secure: true,
  //     },
  //   },
  //   csrfToken: {
  //     name: `__Host-next-auth.csrf-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'none',
  //       path: '/',
  //       secure: true,
  //     },
  //   },
  //   pkceCodeVerifier: {
  //     name: `_cookiePrefix_next-auth.pkce.code_verifier`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'none',
  //       path: '/',
  //       secure: true,
  //     },
  //   },
  //   state: {
  //     name: `_cookiePrefix_next-auth.state`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'none',
  //       path: '/',
  //       secure: true,
  //     },
  //   },
  // },
})
