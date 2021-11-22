import { NextApiRequest, NextApiResponse } from "next"

type ErrorableResponse = {
  err?: string
}

export function isNotPost(
  req: NextApiRequest,
  res: NextApiResponse<ErrorableResponse>
) {
  if (req.method !== "POST") {
    res.status(400).json({ err: "not-post" })
    console.warn("not-post")
    return true
  }
  return false
}

export function isMissingArgs(
  res: NextApiResponse<ErrorableResponse>,
  params: any[]
) {
  for (let i = 0; i < params.length; i++) {
    let parm = params[i]
    if (!parm) {
      res.status(400).json({ err: "missing-arg-" + i })
      console.warn("missing-arg-" + i)
      return true
    }
  }
  return false
}
