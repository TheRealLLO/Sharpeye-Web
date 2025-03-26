import type { NextApiRequest, NextApiResponse } from "next";
import { changeUserPassword } from "server/utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query as { userId: string };
  const { newPassword } = req.body as { newPassword: string };

  const isPasswordChanged = await changeUserPassword(newPassword, undefined, userId);

  if (!isPasswordChanged) {
    return res.status(400).json("Failed");
  } else {
    return res.status(200).json("Success");
  }
}