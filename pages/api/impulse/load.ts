// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { runCorsMiddleware } from '../../../lib/cors'
import { prismaClient } from '../../../lib/prisma'
import * as ensure from '../../../lib/ensure'

const namespace = 'impulse:load'

type Data = {
  data?: {
    id: string
    title: string | null
    data_string: string | null
    data_version: number | null
    last_updated: number
  } | null
  err?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await runCorsMiddleware(req, res)

  if (ensure.isNotPost(req, res)) {
    return
  }

  let { user_id, dir, id } = req.body

  if (ensure.isMissingArgs(res, [user_id, id])) {
    return
  }

  console.log(namespace, 'loading: ', id, user_id)

  const data = await prismaClient.tilemaps.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      updated_at: true,
      data_string: true,
      data_version: true,
    },
  })

  if (!data) {
    res.status(200).json({
      err: 'no-data',
    })
  } else {
    res.status(200).json({
      data: {
        id: data.id,
        title: data.title,
        last_updated: data.updated_at?.getTime() || 0,
        data_string: data.data_string || null,
        data_version: data.data_version,
      },
    })
  }
}
