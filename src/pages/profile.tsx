import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MainLayout from "@layouts/Main";
import Footer from "@components/Crypto/Footer";
import TopNav from "@components/Navbars/TopNav-15";
import Navbar from "@components/Navbars/CryptoNav";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { Tabs } from "antd";

const Profile = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tabKey, setTabKey] = useState("1");

  const foo = async (email: string) => {
    try {
      const { data } = await axios.post(`/api/get-purchased-items`, {
        email: email,
      });
      console.log("data: ", data);
      setPurchasedItems(data);
    } catch (e) {
      alert(
        e?.response?.data?.message ??
          e.message ??
          "Error getting purchased items of user with email: " + email
      );
    }
  };

  useEffect(() => {
    if (status === "authenticated" && sessionData?.user?.email) {
      foo(sessionData?.user?.email);
      setUser(sessionData?.user);
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [sessionData?.user?.email, status]);

  useEffect(() => {
    document.body.classList.add("home-style-15");
    return () => document.body.classList.remove("home-style-15");
  }, []);

  const handleNewPasswordChange = useCallback(
    (e: any) => setNewPassword(e.target.value),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.trim().length < 7) {
      alert("Password should be at least 7 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `/api/change-password-auth/${user.id}`,
        {
          newPassword,
        }
      );

      alert("Successfully changed password");
      setIsPasswordChanged(true);
    } catch (e) {
      alert(e?.response?.data?.message ?? "Error Changing Password");
    } finally {
      setIsLoading(false);
    }
  };

  const profileTabContent = (
    <div>
      <p style={{ color: "white" }}>{sessionData?.user.email}</p>
      <p style={{ color: "white" }}>{sessionData?.user.name}</p>
      <form className={`contactForm`}>
        <h1 className="text-2xl text-white">{i18n.t("change_password")}</h1>
        <input
          type="password"
          placeholder={i18n.t("new_password")}
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <button
          className="mt-5 bg-secondaryColor"
          type="submit"
          onClick={handleSubmit}
        >
          {i18n.t("change_password")}
        </button>

        {isPasswordChanged && (
          <>
            <p className="my-5 text-white">
              Your password was successfully changed
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                void signIn();
              }}
            >
              {i18n.t("signin_send")}
            </button>
          </>
        )}
      </form>
    </div>
  );

  const educationsTabContent = purchasedItems.map((item, index) => (
    <div
      key={item.id}
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <span style={{ marginLeft: "100px", marginRight: "100px" }}>
          {item.createdAt}
        </span>
      </div>
      {item.items
        .filter((item) => item.type === "education" || item.type === null)
        .map((product, index) => (
          <div key={product.id} style={{ color: "white" }}>
            {product.name}
          </div>
        ))}
    </div>
  ));

  const blogTabContent = () => {
    return purchasedItems.map((item, index) => (
      <div
        key={item.id}
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <span style={{ marginLeft: "100px", marginRight: "100px" }}>
            {item.createdAt}
          </span>
        </div>
        {console.log("item: ", item)};{console.log("item.items: ", item.items)}
        {item.items
          .filter((item) => item.type === "blog")
          .map((product, index) => (
            <div key={product.id} style={{ color: "white" }}>
              {product.name}
            </div>
          ))}
      </div>
    ));
  };

  return (
    <>
      <Head>
        <title>SharpEye Trading</title>
      </Head>

      <MainLayout>
        <div className="container">
          <header className="style-15">
            <div className="navs-container">
              <TopNav />
              <Navbar />
            </div>
          </header>
          <main>
            {status === "loading" ? (
              <div>
                <p>Loading...</p>
              </div>
            ) : (
              <Tabs
                defaultActiveKey="1"
                tabPosition={"left"}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "50px 0",
                }}
                onChange={(key) => setTabKey(key)}
                items={[
                  {
                    label: "Personal Information",
                    key: "1",
                    children: profileTabContent,
                  },
                  {
                    label: "Eğitimlerim",
                    key: "2",
                    children: educationsTabContent,
                  },
                  {
                    label: "Bültenlerim",
                    key: "3",
                    children: blogTabContent(),
                  },
                ]}
              ></Tabs>
            )}
          </main>
        </div>
        <Footer />
      </MainLayout>
    </>
  );
};
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default Profile;
