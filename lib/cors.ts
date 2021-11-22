// https://nextjs.org/docs/api-routes/api-middlewares#connectexpress-middleware-support
import Cors from "cors"
import { NextApiRequest, NextApiResponse } from "next"
const cors = Cors({
  methods: ["POST", "HEAD"],
})
// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  fn: any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export async function runCorsMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await runMiddleware(req, res, cors)
}
