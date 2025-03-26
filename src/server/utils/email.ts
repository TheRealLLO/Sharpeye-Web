import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import type React from "react";

type EmailPayload = {
  to: string;
  subject: string;
  htmlTemplate: (_: object) => React.JSX.Element;
  htmlTemplateArgs?: object;
};

// Replace with your SMTP credentials
const smtpOptions = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  const response = await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    to: data.to,
    subject: data.subject,
    html: render(data.htmlTemplate({ ...data.htmlTemplateArgs })),
  });
  console.info(
    `Email sent to ${data.to} with subject ${
      data.subject
    }. Response: ${JSON.stringify(response)}`
  );
};
