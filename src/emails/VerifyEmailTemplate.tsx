import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Link } from "@react-email/link";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

export default function VerifyEmailTemplate({
  name,
  link,
}: {
  name: string;
  link: string;
}) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Hi there {name}!</Text>
          <Link style={paragraph} href={link}>
            Click here to verify your email
          </Link>
        </Container>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: "#ffffff",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};
