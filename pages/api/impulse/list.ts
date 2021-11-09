// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { runCorsMiddleware } from "../../../lib/cors";
import { prismaClient } from "../../../lib/prisma";

const namespace = "impulse:list";

type Data = {
  data?: { id: string; title: string | null }[];
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

  let { user } = req.body;
  console.log(namespace, "listing: ", user);

  const data = await prismaClient.tilemaps.findMany({
    where: {
      owner: user,
    },
    select: {
      id: true,
      title: true,
    },
  });

  console.log(namespace, data);

  res.status(200).json({ data: data });
}
