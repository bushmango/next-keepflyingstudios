// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { runCorsMiddleware } from "../../../lib/cors"
import { prismaClient } from "../../../lib/prisma"
import * as ensure from "../../../lib/ensure"

const namespace = "impulse:list"

type Data = {
  data?: { id: string; title: string | null }[]
  err?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runCorsMiddleware(req, res)

  if (ensure.isNotPost(req, res)) {
    return
  }

  let { user_id } = req.body

  if (ensure.isMissingArgs(res, [user_id])) {
    return
  }

  console.log(namespace, "listing: ", user_id)

  const data = await prismaClient.tilemaps.findMany({
    where: {
      owner: user_id,
      OR: [
        {
          deleted: {
            equals: null,
          },
        },
        {
          deleted: {
            equals: false,
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
    },
  })

  console.log(namespace, data)

  res.status(200).json({ data: data })
}
