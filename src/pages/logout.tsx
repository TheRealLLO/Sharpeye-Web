import React, { useEffect, useState } from "react";
import Head from "next/head";
import MainLayout from "@layouts/Main";
import Footer from "@components/Crypto/Footer";
import TopNav from "@components/Navbars/TopNav-15";
import Navbar from "@components/Navbars/CryptoNav";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { signOut, useSession } from "next-auth/react";
const Logout = () => {
  const { data: sessionData } = useSession();
  useEffect(() => {
    if (!sessionData) {
      window.location.href = "/";
    }
    document.body.classList.add("home-style-15");
    signOut();
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
              <h2 className="fs-1"> {sessionData?.user.email} </h2>
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

export default Logout;
