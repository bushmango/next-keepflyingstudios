// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { tilemaps } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import { runCorsMiddleware } from '../../../lib/cors'
import * as ensure from '../../../lib/ensure'
import { prismaClient } from '../../../lib/prisma'

const namespace = 'impulse:save'

type Data = {
  id?: string
  title?: string
  last_updated?: number
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

  let {
    user_id,
    user_access_token,
    title,
    dir,
    data_string,
    id,
    data_version,
    last_updated,
  } = req.body

  if (ensure.isMissingArgs(namespace, res, [title, data_string])) {
    return
  }

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

  console.log(namespace, 'saving: ', title, id, auth_user_id)

  let updated_at = new Date()

  let tm: Partial<tilemaps> = {
    id,
    data_string,
    data_version,
    user_id: auth_user_id,
    title: title,
    updated_at,
    deleted: false,
  }

  if (!id) {
    tm.id = uuidv4()
    tm.created_at = new Date()
    await prismaClient.tilemaps.create({ data: tm as tilemaps })
  } else {
    await prismaClient.tilemaps.update({
      where: {
        id: id,
      },
      data: tm,
    })
  }
  res.status(200).json({
    id: tm.id,
    title: tm.title || undefined,
    last_updated: tm.updated_at ? tm.updated_at.getTime() : 0,
  })
  // prismaClient.tilemaps.upsert({
  //   where: {
  //     id: id,
  //   },
  //   insert: tm,
  //   update: tm,
  // });

  // const data = await prisma.tilemaps.findUnique({
  //   where: {
  //     id: "" + params?.pid,
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //   },
  // });
  // return {
  //   props: { data },
  // };

  // res.status(200).json({ name: "John Doe" });
}
