import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import MainLayout from "layouts/Main";
import TopNav from "components/Navbars/TopNav-15";
import Navbar from "components/Navbars/CryptoNav";
import Footer from "components/Crypto/Footer";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ChangePassword: React.FC = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const queryToken = params.get("token");

    try {
      const response = await axios.post(`/api/change-password/${queryToken}`, {
        newPassword,
      });

      alert("Successfully changed password");
      setIsPasswordChanged(true);
    } catch (e) {
      alert(e?.response?.data?.message ?? "Error Changing Password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>SharpEye Trading</title>
      </Head>
      <MainLayout>
        <header style={{ paddingBottom: "25px" }} className="style-15">
          <div className="navs-container">
            <TopNav />
          </div>
        </header>
        <main style={{ paddingBottom: "75px" }}>
          <section className=" style-15 section-padding">
            <div
              className="container"
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <form className={`contactForm`}>
                <h1 className="mb-5 text-2xl text-white">{i18n.t("change_password")}</h1>
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
                <Footer />
              </form>
            </div>
          </section>
        </main>
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

export default ChangePassword;
