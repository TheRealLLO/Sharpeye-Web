import React, { useState, useCallback } from "react";
import "react-phone-input-2/lib/style.css";
import { i18n } from "next-i18next";
import PhoneInput from "react-phone-input-2";

const RegisterForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    mobile: "",
    password: "",
    email: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    document.getElementById("button").innerHTML = "Gönderiliyor...";
    const formData = {};
    Array.from(e.currentTarget.elements).forEach(
      (field: { name: string; value: string }) => {
        if (!field.name) return;
        formData[field.name] = field.value;
      }
    );
    formData["mobile"] = formState.mobile;
    console.log({ msg: "sending new signup", formState, formData });
    try {
      const resp = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
        }),
      });
      const status = resp.status;
      const resp_read = await resp.json();
      if (status === 422 || status === 409) {
        alert(resp_read.message);
      } else if (status === 201) {
        alert("Successfully created user. Please verify your email");
      }
    } catch (e) {
      alert(e?.response?.data?.message ?? "Error creating user");
    }
  };

  return (
    <>
      <form className="contact-form" method="post" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">{i18n.t("register_name")}</label>
          <input type="text" name="name" />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
        </p>
        <PhoneInput
          inputClass="phone-input"
          inputProps={{
            id: "phone",
          }}
          country={"tr"}
          value={formState.mobile}
          onChange={(phone, country, event, formattedValue) => {
            setFormState({
              ...formState,
              mobile: formattedValue,
            });
          }}
          inputStyle={{
            width: "100%",
          }}
        />
        <p>
          <label htmlFor="password">{i18n.t("register_password")}</label>
          <input type="password" name="password" />
        </p>
        <p>
          <button id="button">{i18n.t("register_send")}</button>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
