// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { NextApiRequest, NextApiResponse } from "next";
import { runCorsMiddleware } from "../../../lib/cors";
import { s3client } from "../../../lib/s3client";

const namespace = "impulse:preview";
const bucket = "impulse-tilemap-previews";
type Data = {
  url?: string;
  err?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await runCorsMiddleware(req, res);

    // TODO: some sort of access key
    // if (req.method !== "POST") {
    //   res.status(400).json({ err: "not-post" });
    //   return;
    // }

    let { id } = req.body;

    const command = new PutObjectCommand({
      Bucket: bucket,
      ACL: "public-read",
      Key: id + ".png",
    });
    var url = await getSignedUrl(s3client, command, { expiresIn: 5 * 60 });
    console.log("The URL is", url); // expires in 60 seconds

    res.status(200).json({
      url,
    });
  } catch (err) {
    res.status(500).json({
      err: "crash",
    });
  }
}
