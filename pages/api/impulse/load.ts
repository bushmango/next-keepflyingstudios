// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { runCorsMiddleware } from "../../../lib/cors";
import { prismaClient } from "../../../lib/prisma";

const namespace = "impulse:load";

type Data = {
  data?: {
    id: string;
    title: string | null;
    data_string: string | null;
    data_version: number | null;
  } | null;
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

  let { user, dir, id } = req.body;
  console.log(namespace, "loading: ", id, user);

  const data = await prismaClient.tilemaps.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      data_string: true,
      data_version: true,
    },
  });

  res.status(200).json({ data });
}
