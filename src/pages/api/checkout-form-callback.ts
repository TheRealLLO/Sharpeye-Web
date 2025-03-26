import type { NextApiRequest, NextApiResponse } from "next";
import { markPaymentAsSuccessful } from "server/utils/queries";
import { getToken } from "types/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as {
    token: string;
  };
  console.log({ msg: "Got checkout response", data });
  await markPaymentAsSuccessful(data.token);
  res.redirect(`${process.env.APP_URL}/payment-result`);
}
