import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db";
import * as bcrypt from "bcryptjs";
import { ulid } from "ulid";
import { addDays } from "date-fns";
import { mailOptions, transporter } from "config/nodemailer";
import VerifyEmailTemplate from "emails/VerifyEmailTemplate";
import { sendEmail } from "server/utils/email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  const data = JSON.parse(req.body) as {
    email: string;
    password: string;
    mobile: string;
    name: string;
  };
  const { email, password, mobile, name } = data;
  const userEmail = email.trim().toLowerCase();
  const userName = name.trim();
  const userMobile = mobile.trim();

  if (!name || !userMobile || !email || !password) {
    res.status(422).json({ message: "All fields are required" });
    return;
  }

  if (!userEmail || !userEmail.includes("@")) {
    res.status(422).json({ message: "Invalid email" });
    return;
  }

  if (!password || password.length < 7) {
    res.status(422).json({
      message: "Password should be at least 7 characters long",
    });
    return;
  }

  // There is actually an existingUser if username matches
  // OR if email matches and both username and password are set
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { name: userName },
        {
          AND: [{ email: userEmail }],
        },
      ],
    },
  });

  if (existingUser) {
    const message: string =
      existingUser.email !== userEmail
        ? "Username already taken"
        : "Email address is already registered";

    return res.status(409).json({ message: message });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const verificationToken = ulid();

  const user = await prisma.user.create({
    data: {
      name: userName,
      mobile: userMobile,
      email: userEmail,
      password: hashedPassword,
      emailVerified: false,
      verificationToken: {
        create: {
          token: verificationToken,
          expires: addDays(new Date(), 7),
        },
      },
    },
  });

  const userWithoutSensitiveInformation = { ...user };
  delete userWithoutSensitiveInformation.password;

  await sendEmail({
    to: userEmail,
    subject: "Verify your email for SharpEye Trading",
    htmlTemplate: VerifyEmailTemplate,
    htmlTemplateArgs: {
      name: userName,
      link: `${process.env.APP_URL}/verify-email?token=${verificationToken}`,
    },
  });

  console.info(`User ${user.email} successfully signed up by himself.)`);
  res.status(201).json({ message: "Created user" });
}
