// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { tilemaps } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { runCorsMiddleware } from "../../../lib/cors";
import { prismaClient } from "../../../lib/prisma";

const namespace = "impulse:save";

type Data = {
  id?: string;
  err?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runCorsMiddleware(req, res);
  if (req.method !== "POST") {
    res.status(400).json({ err: "not-post" });
    return;
  }

  let { user, title, dir, data_string, id, data_version } = req.body;
  console.log(namespace, "saving: ", title, id, user);
  let tm: Partial<tilemaps> = {
    id,
    data_string,
    data_version,
    owner: user,
    title: title,
    updated_at: new Date(),
  };

  if (!id) {
    tm.id = uuidv4();
    tm.created_at = new Date();
    await prismaClient.tilemaps.create({ data: tm });
  } else {
    await prismaClient.tilemaps.update({
      where: {
        id: id,
      },
      data: tm,
    });
  }
  res.status(200).json({ id: tm.id });
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
