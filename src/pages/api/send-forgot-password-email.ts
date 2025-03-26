import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "server/utils/email";
import {
  createForgotPasswordToken,
  getUserByEmail,
} from "server/utils/queries";
import ForgotPasswordEmail from "emails/ForgotPasswordTemplate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = JSON.parse(req.body) as { email: string };
  const user = await getUserByEmail(data.email);
  const forgotPasswordToken = await createForgotPasswordToken(user.id);
  const link = `${process.env.APP_URL}/change-password?token=${forgotPasswordToken.token}`;
  console.log({
    msg: "Requested in forgot password by ",
    data,
    appurl: process.env.APP_URL,
    link,
  });

  await sendEmail({
    to: user.email,
    subject: "Sharpeye Forgot Password",
    htmlTemplate: ForgotPasswordEmail,
    htmlTemplateArgs: {
      name: user.name,
      link,
    },
  });
  console.info(`Forgot password email succesfully sent to ${user.email}`);
  return res.status(200).json({ message: "Email sent successfully" });
}
