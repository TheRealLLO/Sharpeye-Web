import React, { useEffect } from "react";
import Head from "next/head";
import MainLayout from "@layouts/Main";
import Footer from "@components/Crypto/Footer";
import TopNav from "@components/Navbars/TopNav-15";
import Navbar from "@components/Navbars/CryptoNav";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { i18n } from "next-i18next";
import useSize from "hooks/useSize";
import FAQPartners from "@components/Crypto/FAQPartners";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Partners = () => {
  const windowSize = useSize();
  const windowWidth = windowSize[0];
  useEffect(() => {
    document.body.classList.add("home-style-15");
    return () => document.body.classList.remove("home-style-15");
  }, []);

  return (
    <>
      <Head>
        <title>SharpEye Trading</title>
      </Head>

      <MainLayout>
        <header className="style-15">
          <div className="navs-container">
            <TopNav />
            <Navbar />
          </div>
        </header>
        <main>
          <section>
            <div
              className="container"
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="wow fadeInUp" style={{ marginBottom: "50px" }}>
                <h2 className="fs-1"> {i18n.t("partners_title")} </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  textAlign: "center",
                  alignItems: "center",
                  gap: "50px",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontWeight: "bold",
                      fontSize: "25px",
                      marginBottom: "20px",
                    }}
                  >
                    {i18n.t("commissions_headline")}
                  </h2>
                  <h2 style={{ fontWeight: "normal", fontSize: "20px" }}>
                    {i18n.t("commissions_subline")}
                  </h2>
                  <ul
                    style={{
                      listStyleType: "disc",
                      textAlign: "left",
                      marginLeft: "30px",
                      marginTop: "20px",
                    }}
                  >
                    <li>{i18n.t("commissions_1")}</li>
                    <li>{i18n.t("commissions_2")}</li>
                  </ul>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "normal",
                    textAlign: "center",
                    gap: "10px",
                    marginTop: "50px",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "0px 20px",
                      justifyContent: "space-between",
                      marginTop: "-50px",
                    }}
                  >
                    <div
                      style={{
                        gap: "15px",
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <h3 style={{ fontWeight: "bold" }}>{i18n.t("crypto")}</h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        textAlign: "left",
                        justifyContent: "start",
                      }}
                    >
                      <h3
                        style={{
                          fontWeight: "normal",
                          fontSize: "15px",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        {i18n.t("global")}
                      </h3>
                      <div style={{ border: "1px solid white" }}>
                        <img src="/assets/img/partners/binance_partner.jpeg" />
                      </div>
                      <div style={{ border: "1px solid white" }}>
                        <img src="/assets/img/partners/okx_partner.jpeg" />
                      </div>
                      <h3
                        style={{
                          fontWeight: "normal",
                          fontSize: "15px",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        {i18n.t("turkey")}
                      </h3>
                      <div style={{ border: "1px solid white" }}>
                        <img src="/assets/img/partners/okx_tr_partner.jpeg" />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      borderLeft: "1px solid white",
                      height: "auto",
                      padding: "0px 20px",
                    }}
                  ></div>
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "0px 20px",
                      justifyContent: "start",
                      marginTop: "-50px",
                    }}
                  >
                    <div
                      style={{
                        gap: "15px",
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "12px",
                      }}
                    >
                      <h3 style={{ fontWeight: "bold" }}>{i18n.t("forex")}</h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        justifyContent: "start",
                      }}
                    >
                      <h3
                        style={{
                          fontWeight: "normal",
                          fontSize: "15px",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        {i18n.t("brokerage_firm")}
                      </h3>
                      <div style={{ border: "1px solid white" }}>
                        <img src="/assets/img/partners/tickmill_partner.jpeg" />
                      </div>
                      <h3
                        style={{
                          fontWeight: "normal",
                          fontSize: "15px",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        {i18n.t("prop_firm")}
                      </h3>
                      <div style={{ border: "1px solid white" }}>
                        <img src="/assets/img/partners/five_percenters_partner.jpeg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <FAQPartners />
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

export default Partners;
