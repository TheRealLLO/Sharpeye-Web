import React, { useState, useCallback } from "react";
import "react-phone-input-2/lib/style.css";
import { i18n } from "next-i18next";
import Modal from "react-modal";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const SignInForm: React.FC = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    mobile: "",
    password: "",
    email: "",
  });
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const handleForgotEmailChange = useCallback(
    (e: any) => setForgotEmail(e.target.value),
    []
  );
  const handleForgotPassword = async (e: any) => {
    e.preventDefault();

    if (forgotEmail?.length < 1) {
      alert("Email is required");
      return;
    }

    if (!forgotEmail.includes("@")) {
      alert("Invalid email");
      return;
    }
    console.log("Sending forgot password email to " + forgotEmail);
    try {
      const resp = await fetch("/api/send-forgot-password-email", {
        method: "POST",
        body: JSON.stringify({
          email: forgotEmail,
        }),
      });
      if (!resp.ok) {
        alert("Error sending password change request");
      } else {
        alert("An email will be sent if an account exists with given email");
      }
    } catch (e) {
      alert("Error sending password change request");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSigningIn(true);
    const formData = {};
    Array.from(e.currentTarget.elements).forEach(
      (field: { name: string; value: string }) => {
        if (!field.name) return;
        formData[field.name] = field.value;
      }
    );
    console.log({ msg: "Signing in", formData });
    try {
      const result = await signIn("credentials", {
        email: formData["email"],
        password: formData["password"],
        redirect: false,
      });

      if (result?.error) {
        alert("Error signing in. Please check your credentials");
      } else {
        router.push("/");
      }
    } catch (err) {
      alert("Error signing in. Please check your credentials");
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <>
      <Modal
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            minWidth: "40vw",
            textColor: "white",
            color: "black",
            backgroundColor: "black",
          },
          overlay: {
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 5,
          },
        }}
        isOpen={forgotPasswordModalOpen}
        onRequestClose={() => setForgotPasswordModalOpen(false)}
        shouldCloseOnOverlayClick={true}
      >
        <i
          className="pi pi-times cursor-pointer self-end"
          onClick={() => setForgotPasswordModalOpen(false)}
          style={{ color: "red" }}
        ></i>

        <form
          className="contact-form"
          style={{
            width: "100%",
          }}
        >
          <div>
            <h3
              style={{
                color: "white",
                marginBottom: "1rem",
              }}
            >
              {i18n.t("forgot_password")}
            </h3>
            <input
              type="email"
              placeholder={i18n.t("email")}
              value={forgotEmail}
              style={{
                marginBottom: "1rem",
                width: "100%",
              }}
              onChange={handleForgotEmailChange}
            />

            <button
              className="bg-secondaryColor"
              type="submit"
              onClick={handleForgotPassword}
              style={{
                display: "block",
                width: "100%",
              }}
            >
              {i18n.t("send_recovery_email")}
            </button>
          </div>
        </form>
      </Modal>

      <form className="contact-form" method="post" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">{i18n.t("email")}</label>
          <input type="email" name="email" />
        </p>
        <p>
          <label htmlFor="password">{i18n.t("register_password")}</label>
          <input type="password" name="password" />
        </p>
        <p>
          <button id="button">
            {signingIn ? "Gönderiliyor..." : i18n.t("signin_send")}
          </button>
        </p>
      </form>
      <p>
        <button
          id="button"
          onClick={() => setForgotPasswordModalOpen(true)}
          style={{ width: "40%", marginTop: "20px" }}
        >
          {i18n.t("forgot_password")}
        </button>
      </p>
    </>
  );
};

export default SignInForm;
