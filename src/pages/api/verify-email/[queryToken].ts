import type { NextApiRequest, NextApiResponse } from "next";
import { verifyUserEmail } from "server/utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { queryToken } = req.query;

  const isUserVerified = await verifyUserEmail(queryToken as string);

  if (!isUserVerified) {
    return res.status(400).json("Failed");
  } else {
    return res.status(200).json("Success");
  }
}
