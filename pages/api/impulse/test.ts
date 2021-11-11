// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { runCorsMiddleware } from "../../../lib/cors";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3client } from "../../../lib/s3client";

const namespace = "impulse:test";

type Data = {
  err?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runCorsMiddleware(req, res);
  // if (req.method !== "POST") {
  //   res.status(400).json({ err: "not-post" });
  //   return;
  // }

  let { user, title, dir, data_string, id, data_version } = req.body;
  console.log(namespace, "testing: ", title, id, user);

  const commandPut = new PutObjectCommand({
    Bucket: "impulse-tilemap-previews",
    Key: "test-key",
    Body: "this is a test",
  });

  const responsePut = await s3client.send(commandPut);
  console.log("put", responsePut.$metadata);
  // await listItemsInBucket(bucketName);

  // const command2 = new PutObjectCommand({
  //   Bucket: bucketParams.Key,
  //   Key: bucketName,
  //   Body: bucketParams.Body,
  // })

  // Create the presigned URL.
  // const signedUrlPut = await getSignedUrl(
  //   s3client as any,
  //   commandPut as any,
  //   {
  //     expiresIn: 3600,
  //   }
  // )
  // console.log('signedUrl', signedUrlPut)
  // console.log(
  //   `\nPutting "${bucketParams.Key}" using signedUrl with body "${bucketParams.Body}" in v3`
  // )
  // console.log('put', signedUrlPut)
  // const commandGet = new GetObjectCommand({
  //   Bucket: bucketName,
  //   Key: bucketParams.Key,
  // });
  // const signedUrlGet = await getSignedUrl(s3client as any, commandGet as any, {
  //   expiresIn: 60 * 5, // 5 minutes
  // });
  // console.log("fetch", signedUrlGet);

  res.status(200).json({
    err: "none",
  });
}
