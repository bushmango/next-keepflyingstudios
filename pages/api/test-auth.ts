// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { runCorsMiddleware } from '../../lib/cors'

import { prismaClient } from '../../lib/prisma'

const namespace = 'impulse:test-auth'

type Data = {
  name: string
  session: Session | null
  data?: { email: string | null; custom_access_token: string } | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await runCorsMiddleware(req, res)

  const session = await getSession({ req })

  if (session && session.user && session.user.email) {
    // if (ensure.isNotPost(req, res)) {
    //   return
    // }

    // if (ensure.isMissingArgs(res, [user_id])) {
    //   return
    // }

    console.log(namespace, 'get token: ')

    const data = await prismaClient.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        email: true,
        custom_access_token: true,
      },
    })

    console.log(namespace, data)

    res.status(200).json({ name: 'ok', session, data })
  }

  res.status(200).json({ name: 'no-session', session })
}
