// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { runCorsMiddleware } from '../../../lib/cors'
import { prismaClient } from '../../../lib/prisma'
import * as ensure from '../../../lib/ensure'

const namespace = 'impulse:list'

type Data = {
  data?: { id: string; title: string | null }[]
  err?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await runCorsMiddleware(req, res)

  if (ensure.isNotPost(namespace, req, res)) {
    return
  }

  let { user_id, user_access_token } = req.body

  // if (ensure.isMissingArgs(res, [])) {
  //   return
  // }

  let auth_user_id = await ensure.getAuthorizedUserId(
    namespace,
    req,
    res,
    user_id,
    user_access_token,
  )
  if (!auth_user_id) {
    return
  }

  console.log(namespace, 'listing: ', auth_user_id)

  const data = await prismaClient.tilemaps.findMany({
    where: {
      user_id: auth_user_id,
      deleted: false,
    },
    select: {
      id: true,
      title: true,
    },
  })

  console.log(namespace, data)

  res.status(200).json({ data: data })
}
