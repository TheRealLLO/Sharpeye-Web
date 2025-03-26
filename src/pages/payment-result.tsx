import React, { useEffect, useState } from "react";
import Head from "next/head";
import MainLayout from "@layouts/Main";
import Footer from "@components/Crypto/Footer";
import TopNav from "@components/Navbars/TopNav-15";
import Navbar from "@components/Navbars/CryptoNav";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCart } from "hooks/useCart";
const Profile = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [scripts, setScripts] = useState<{ s: string; k: string }[]>([]);

  useEffect(() => {
    document.body.classList.add("home-style-15");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("address");
    return () => document.body.classList.remove("home-style-15");
  }, []);


  return (
    <>
      <Head>
        <title>SharpEye Trading</title>
      </Head>

      <MainLayout>
        <header style={{ paddingBottom: "100px" }} className="style-15">
          <div className="navs-container">
            <TopNav />
            <Navbar />
          </div>
        </header>
        <main>
          <section className=" style-15 section-padding">
            <div
              className="container"
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              SUCCESS
            </div>
          </section>
        </main>
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
