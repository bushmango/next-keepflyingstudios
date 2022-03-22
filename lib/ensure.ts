import { IncomingMessage, ServerResponse } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prismaClient } from './prisma'

type ErrorableResponse = {
  err?: string
}

export function isNotPost(
  namespace: string,
  req: NextApiRequest,
  res: NextApiResponse<ErrorableResponse>,
) {
  if (req.method !== 'POST') {
    res.status(400).json({ err: 'not-post' })
    console.warn(namespace, 'not-post')
    return true
  }
  return false
}

export function isMissingArgs(
  namespace: string,
  res: NextApiResponse<ErrorableResponse>,
  params: any[],
) {
  for (let i = 0; i < params.length; i++) {
    let parm = params[i]
    if (!parm) {
      res.status(400).json({ err: 'missing-arg-' + i })
      console.warn(namespace, 'missing-arg-' + i)
      return true
    }
  }
  return false
}

export async function getAuthorizedUserId(
  namespace: string,
  req: NextApiRequest,
  res: NextApiResponse<ErrorableResponse>,
  user_id: string | null,
  user_access_token: string | null,
): Promise<string | null> {
  const session = await getSession({ req })

  if (session && session.user_id) {
    return session.user_id as string
  }

  if (user_id && user_access_token) {
    let record = await prismaClient.user.findFirst({
      where: {
        id: user_id,
        custom_access_token: user_access_token,
      },
      select: {
        id: true,
      },
    })
    if (record) {
      return record.id
    }
  }

  res.status(400).json({ err: 'unauthorized' })
  console.warn(namespace, 'unauthorized', '' + user_id, '' + user_access_token)

  return null
}

export async function getAuthorizedUserIdPage(
  namespace: string,
  req: IncomingMessage,
  res: ServerResponse,
  user_id: string | null,
  user_access_token: string | null,
): Promise<string> {
  const session = await getSession({ req })

  // Use override if we have it (dev and impersonation support)
  if (user_id && user_access_token) {
    let record = await prismaClient.user.findFirst({
      where: {
        id: user_id,
        custom_access_token: user_access_token,
      },
      select: {
        id: true,
      },
    })
    if (record) {
      return record.id
    }
  }

  // Else use current logged-in session
  if (session && session.user_id) {
    return session.user_id as string
  }

  return 'unauthorized'
  // res.status(400).json({ err: 'unauthorized' })
  // console.warn(namespace, 'unauthorized', '' + user_id, '' + user_access_token)

  // return null
}
