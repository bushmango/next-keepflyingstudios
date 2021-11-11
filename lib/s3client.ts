import { S3Client } from "@aws-sdk/client-s3";

require("dotenv").config();

const REGION = "us-east-1";

console.log("create client", process.env.AWS_S3_KEY);
const s3client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY || "",
    secretAccessKey: process.env.AWS_S3_SECRET || "",
  },
  region: REGION,
  forcePathStyle: true,
});

export { s3client };
