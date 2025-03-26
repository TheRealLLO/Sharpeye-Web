import React, { useEffect, useState } from "react";
import Head from "next/head";
//= Layout
import MainLayout from "@layouts/Main";
//= Components
import Footer from "@components/Crypto/Footer";
import TopNav from "@components/Navbars/TopNav-15";
import Navbar from "@components/Navbars/CryptoNav";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FAQ from "@components/Crypto/FAQ";
import useSize from "../hooks/useSize";
import { Button } from "antd";
import { useCart } from "../hooks/useCart";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useCustomNotification } from "components/Notification";

import axios from "axios";

const Education = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [isEducationPurchased, setIsEducationPurchased] = useState(false);
  const [isAcademyPurchased, setIsAcademyPurchased] = useState(false);
  const { openNotification, contextHolder } = useCustomNotification();

  const fetchPurchasedItems = async (email) => {
    try {
      const { data } = await axios.post(`/api/get-purchased-items`, {
        email: email,
      });
      console.log("data: ", data);
      setPurchasedItems(data);
      data.forEach((item) => {
        item.items.forEach((item) => {
          if (item.id === 10) setIsEducationPurchased(true);
          if (item.id === 11) setIsAcademyPurchased(true);
        });
      });
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
      fetchPurchasedItems(sessionData?.user?.email);
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [sessionData?.user?.email, status]);

  useEffect(() => {
    document.body.classList.add("home-style-15");
    return () => document.body.classList.remove("home-style-15");
  }, []);

  const [videoIndex, setVideoIndex] = React.useState(0);

  const { cartItems, addToCart } = useCart();
  const windowSize = useSize();
  const windowWidth = windowSize[0];

  const mainRef = React.useRef(null);

  function handleScroll() {
    mainRef.current.scrollIntoView();
  }

  const handleSubmit = (type) => {
    if (
      (type === "training_set" && cartItems.some((item) => item.id === 10)) ||
      (type === "academy_set" && cartItems.some((item) => item.id === 11))
    ) {
      openNotification({
        type: "error",
        message: "Already in cart",
        description: "You have already added this education to cart",
        placement: "bottomRight",
      });
      return;
    }

    if (type === "training_set" && !cartItems.some((item) => item.id === 10)) {
      addToCart({
        id: 10,
        name: "training_set",
        price: 250,
        currency: "₺",
        type: "education",
      });
    } else if (
      type === "academy_set" &&
      !cartItems.some((item) => item.id === 11)
    ) {
      addToCart({
        id: 11,
        name: "academy_set",
        price: 400,
        currency: "₺",
        type: "education",
      });
    }
    openNotification({
      type: "success",
      message: "Added to cart",
      description: "Education added to cart successfully",
      placement: "bottomRight",
    });
    console.log("cartItemsSubmit: ", cartItems);
  };

  return (
    <>
      {contextHolder}
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
                <h2 className="fs-1"> {i18n.t("education_title")} </h2>
              </div>
              <div
                className="videoContainer"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: "40px",
                  marginBottom: "50px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3 style={{ fontSize: "30px" }}>
                    {i18n.t("sharpeye_training_set")}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "20px",
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "left",
                      }}
                    >
                      {i18n.t("training_module_1")}
                    </h4>
                    <h4
                      style={{
                        fontSize: "20px",
                        color: "white",
                        fontWeight: "normal",
                        textAlign: "left",
                      }}
                      type="primary"
                    >
                      {i18n.t("free")}
                    </h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "start",
                      marginTop: "10px",
                    }}
                  >
                    <ul
                      style={{
                        listStyleType: "-",
                        padding: "0",
                        margin: "0",
                        textAlign: "left",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <li style={{ padding: "0", margin: "0" }}>
                        <Button
                          onClick={() => setVideoIndex(1)}
                          style={{
                            width: "100%",
                          }}
                        >
                          {i18n.t("module_content_1_1")}
                        </Button>
                      </li>
                      <li style={{ padding: "0", margin: "0" }}>
                        <Button
                          onClick={() => setVideoIndex(2)}
                          style={{
                            width: "100%",
                          }}
                        >
                          {i18n.t("module_content_1_2")}
                        </Button>
                      </li>
                      <li style={{ padding: "0", margin: "0" }}>
                        <Button
                          onClick={() => setVideoIndex(3)}
                          style={{
                            width: "100%",
                          }}
                        >
                          {i18n.t("module_content_1_3")}
                        </Button>
                      </li>
                    </ul>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "20px",
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {i18n.t("training_module_2")}
                    </h4>
                    {!isEducationPurchased && (
                      <Button
                        style={{
                          marginRight: "5px",
                          marginTop: "2px",
                          marginBottom: "2px",
                        }}
                        type="primary"
                        onClick={() => handleScroll()}
                      >
                        {i18n.t("purchase")}
                      </Button>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "start",
                      marginTop: "10px",
                    }}
                  >
                    <ul
                      style={{
                        padding: "0",
                        margin: "0",
                        textAlign: "left",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <li style={{ padding: "0", margin: "0" }}>
                        <span>{i18n.t("module_content_2_1")}</span>
                      </li>
                      <li style={{ padding: "0", margin: "0" }}>
                        <span>{i18n.t("module_content_2_2")}</span>
                      </li>
                      <li style={{ padding: "0", margin: "0" }}>
                        <span>{i18n.t("module_content_2_3")}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "15px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "20px",
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "left",
                      }}
                    >
                      {i18n.t("training_module_3")}
                    </h4>
                    {!isEducationPurchased && (
                      <Button
                        style={{
                          marginRight: "5px",
                          marginTop: "2px",
                          marginBottom: "2px",
                        }}
                        type="primary"
                        onClick={() => handleScroll()}
                      >
                        {i18n.t("purchase")}
                      </Button>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "start",
                      marginTop: "10px",
                    }}
                  >
                    <ul
                      style={{
                        padding: "0",
                        margin: "0",
                        textAlign: "left",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <li style={{ padding: "0", margin: "0" }}>
                        <span>{i18n.t("module_content_3_1")}</span>
                      </li>
                      <li style={{ padding: "0", margin: "0" }}>
                        <span>{i18n.t("module_content_3_2")}</span>
                      </li>
                      <li style={{ padding: "0", margin: "0" }}>
                        <span>{i18n.t("module_content_3_3")}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "20px",
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "left",
                      }}
                    >
                      {i18n.t("training_module_4")}
                    </h4>
                    {!isEducationPurchased && (
                      <Button
                        style={{
                          marginRight: "5px",
                          marginTop: "2px",
                          marginBottom: "2px",
                        }}
                        type="primary"
                        onClick={() => handleScroll()}
                      >
                        {i18n.t("purchase")}
                      </Button>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "start",
                      marginTop: "10px",
                    }}
                  >
                    <ul
                      style={{
                        listStyleType: "-",
                        padding: "0",
                        margin: "0",
                        textAlign: "left",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <li style={{ padding: "0", margin: "0" }}>
                        <span>{i18n.t("module_content_4_1")}</span>
                      </li>
                      <li style={{ padding: "0", margin: "0" }}>
                        <span>{i18n.t("module_content_4_2")}</span>
                      </li>
                      <li style={{ padding: "0", margin: "0" }}>
                        <span>{i18n.t("module_content_4_3")}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                  }}
                >
                  {videoIndex === 0 && (
                    <video
                      style={{
                        width: "100%",
                      }}
                      controls
                    >
                      <source
                        src="/assets/videos/module_default.mp4"
                        type="video/mp4"
                      ></source>
                    </video>
                  )}
                  {videoIndex === 1 && (
                    <video
                      style={{
                        width: "100%",
                      }}
                      controls
                    >
                      <source
                        src="/assets/videos/module1_1.mp4"
                        type="video/mp4"
                      ></source>
                    </video>
                  )}
                  {videoIndex === 2 && (
                    <video
                      style={{
                        width: "100%",
                      }}
                      controls
                    >
                      <source
                        src="/assets/videos/module1_2.mp4"
                        type="video/mp4"
                      ></source>
                    </video>
                  )}
                  {videoIndex === 3 && (
                    <video
                      style={{
                        width: "100%",
                      }}
                      controls
                    >
                      <source
                        src="/assets/videos/module1_3.mp4"
                        type="video/mp4"
                      ></source>
                    </video>
                  )}
                </div>
              </div>

              <div
                ref={mainRef}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "normal",
                  textAlign: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    //Training Set
                    flex: 1,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
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
                    <h3>{i18n.t("training_set")}</h3>
                  </div>
                  <div style={{ padding: "15px" }}>
                    <img
                      src="/assets/img/elma.png"
                      alt=""
                      className="icon-120 "
                    />
                  </div>

                  <div style={{ padding: "15px" }}>
                    {isEducationPurchased ? (
                      <span style={{ color: "white", fontSize: "20px" }}>
                        {i18n.t("purchased")}
                      </span>
                    ) : (
                      <div
                        className="educationSet"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: 10, fontSize: 20 }}>
                          {i18n.t("training_set_price")} {i18n.t("unit")}
                        </span>
                        <button
                          className="bg-secondaryColor"
                          type="submit"
                          style={{ padding: "10px 20px" }}
                          onClick={() => handleSubmit("training_set")}
                          disabled={isEducationPurchased}
                        >
                          {i18n.t("add_to_cart")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    borderLeft: "1px solid white",
                    height: "auto",
                  }}
                ></div>

                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
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
                    <h3>{i18n.t("academy_set")}</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      padding: "15px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/assets/img/elma.png"
                      alt=""
                      className="icon-120 "
                    />
                  </div>
                  <div style={{ padding: "15px" }}>
                    {isAcademyPurchased ? (
                      <span style={{ color: "white", fontSize: "20px" }}>
                        {i18n.t("purchased")}
                      </span>
                    ) : (
                      <div
                        className="educationSet"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: 10, fontSize: 20 }}>
                          {i18n.t("academy_set_price")} {i18n.t("unit")}
                        </span>
                        <button
                          className="bg-secondaryColor"
                          type="submit"
                          style={{ padding: "10px 20px" }}
                          onClick={() => handleSubmit("academy_set")}
                          disabled={isAcademyPurchased}
                        >
                          {i18n.t("add_to_cart")}
                        </button>
                      </div>
                    )}
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
            </div>
          </section>
        </main>
        <FAQ />
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
const teamStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "50px",
  margin: "80px 10px",
  padding: "80px 0px",
};

export default Education;
