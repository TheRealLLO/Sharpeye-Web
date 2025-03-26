import React, { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Space } from "antd";
import Head from "next/head";
import MainLayout from "@layouts/Main";
import Footer from "@components/Crypto/Footer";
import TopNav from "@components/Navbars/TopNav-15";
import Navbar from "@components/Navbars/CryptoNav";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "next-i18next";
import tr from "../../public/locales/tr/common.json";
import useSize from "../hooks/useSize";
import { useCart } from "../hooks/useCart";
import { useCustomNotification } from "components/Notification";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Blog = () => {
  //TODO: Palkim- Display horizontal white lines if width < 900px
  //TODO: Palkim- Change the apple images with more suitable ones
  const { openNotification, contextHolder } = useCustomNotification();
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  let langFile = tr;

  const { cartItems, addToCart } = useCart();
  const [cryptoValue, setCryptoValue] = useState(1);
  const [forexValue, setForexValue] = useState(1);
  const [allMarketsValue, setAllMarketsValue] = useState(1);
  const [isCryptoPurchased, setIsCryptoPurchased] = useState(false);
  const [isForexPurchased, setIsForexPurchased] = useState(false);
  const [isAllMarketsPurchased, setIsAllMarketsPurchased] = useState(false);
  const windowSize = useSize();
  const windowWidth = windowSize[0];
  const boxWidth = windowWidth / 3;

  const fetchPurchasedItems = async (email) => {
    const cryptoIds = [1, 2, 3];
    const forexIds = [4, 5, 6];
    const allMarketIds = [7, 8, 9];

    try {
      const { data } = await axios.post(`/api/get-purchased-items`, {
        email: email,
      });
      data.forEach((item) => {
        item.items.forEach((item) => {
          if (cryptoIds.includes(item.id)) setIsCryptoPurchased(true);
          if (forexIds.includes(item.id)) setIsForexPurchased(true);
          if (allMarketIds.includes(item.id)) setIsAllMarketsPurchased(true);
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

  const handleSubmit = (type: string, selectedValue: number) => {
    const offsetForType = type === "crypto" ? 0 : type === "forex" ? 3 : 6;
    if (cartItems.some((item) => item.id === selectedValue + offsetForType)) {
      openNotification({
        type: "error",
        message: "Already in cart",
        description: "You have already added this item to the cart",
        placement: "bottomRight",
      });
      return;
    }

    if (type === "crypto") {
      if (selectedValue === 1 && !cartItems.some((item) => item.id === 1)) {
        addToCart({
          id: 1,
          name: "crypto_1_month",
          price: 500,
          currency: "₺",
          type: "blog",
        });
      } else if (
        selectedValue === 2 &&
        !cartItems.some((item) => item.id === 2)
      ) {
        addToCart({
          id: 2,
          name: "crypto_3_month",
          price: 1250,
          currency: "₺",
          type: "blog",
        });
      } else if (
        selectedValue === 3 &&
        !cartItems.some((item) => item.id === 3)
      ) {
        addToCart({
          id: 3,
          name: "crypto_12_month",
          price: 3500,
          currency: "₺",
          type: "blog",
        });
      }
    } else if (type === "forex") {
      if (selectedValue === 1 && !cartItems.some((item) => item.id === 4)) {
        addToCart({
          id: 4,
          name: "forex_1_month",
          price: 500,
          currency: "₺",
          type: "blog",
        });
      } else if (
        selectedValue === 2 &&
        !cartItems.some((item) => item.id === 5)
      ) {
        addToCart({
          id: 5,
          name: "forex_3_month",
          price: 1250,
          currency: "₺",
          type: "blog",
        });
      } else if (
        selectedValue === 3 &&
        !cartItems.some((item) => item.id === 6)
      ) {
        addToCart({
          id: 6,
          name: "forex_12_month",
          price: 3500,
          currency: "₺",
          type: "blog",
        });
      }
    } else if (type === "all_markets") {
      if (selectedValue === 1 && !cartItems.some((item) => item.id === 7)) {
        addToCart({
          id: 7,
          name: "all_markets_1_month",
          price: 750,
          currency: "₺",
          type: "blog",
        });
      } else if (
        selectedValue === 2 &&
        !cartItems.some((item) => item.id === 8)
      ) {
        addToCart({
          id: 8,
          name: "all_markets_3_month",
          price: 1750,
          currency: "₺",
          type: "blog",
        });
      } else if (
        selectedValue === 3 &&
        !cartItems.some((item) => item.id === 9)
      ) {
        addToCart({
          id: 9,
          name: "all_markets_12_month",
          price: 4500,
          currency: "₺",
          type: "blog",
        });
      }
    }

    openNotification({
      type: "success",
      message: "Added to cart",
      description: "Blog subscription added to cart successfully",
      placement: "bottomRight",
    });
  };

  const onCryptoChange = (e: RadioChangeEvent) => {
    setCryptoValue(e.target.value);
  };

  const onForexChange = (e: RadioChangeEvent) => {
    setForexValue(e.target.value);
  };

  const onAllMarketsChange = (e: RadioChangeEvent) => {
    setAllMarketsValue(e.target.value);
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
              <div className="wow fadeInUp">
                <h2 className="fs-1"> {i18n.t("blog_title")} </h2>
                <p style={{ lineHeight: "2.4rem", padding: "50px 50px" }}>
                  <strong style={{ color: "#39AA35", fontSize: "16px" }}>
                    {" "}
                    {i18n.t("blog")}
                  </strong>{" "}
                  {i18n.t("blog_explanation")}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: windowWidth >= 900 ? "row" : "column",
                  justifyContent: "center",
                  alignItems: windowWidth >= 900 ? "normal" : "center",
                  textAlign: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    // Crypto
                    width:
                      windowWidth >= 900
                        ? boxWidth.toString() + "px"
                        : windowWidth.toString() + "px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    //gap: "40px",
                    padding: windowWidth >= 900 ? "0px 20px" : "0px 0px",
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
                    <h3>{i18n.t("crypto")}</h3>
                  </div>
                  <div style={{ padding: "15px" }}>
                    <img
                      src="/assets/img/elma.png"
                      alt=""
                      className="icon-120 "
                    />
                  </div>
                  <div>
                    <Radio.Group onChange={onCryptoChange} value={cryptoValue}>
                      <Space direction="vertical">
                        <Radio value={1}>
                          <span style={{ color: "white", fontSize: "20px" }}>
                            500 {i18n.t("unit_month")}
                          </span>
                        </Radio>
                        <Radio value={2}>
                          <span style={{ color: "white", fontSize: "20px" }}>
                            1250 {i18n.t("unit_three_months")}
                          </span>
                        </Radio>
                        <Radio value={3}>
                          <span style={{ color: "white", fontSize: "20px" }}>
                            3500 {i18n.t("unit_twelve_months")}
                          </span>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </div>
                  <div style={{ padding: "15px" }}>
                    {isCryptoPurchased ? (
                      <span style={{ color: "white", fontSize: "20px" }}>
                        {i18n.t("purchased")}
                      </span>
                    ) : (
                      <button
                        className="bg-secondaryColor"
                        type="submit"
                        style={{ padding: "10px 20px" }}
                        onClick={() => handleSubmit("crypto", cryptoValue)}
                      >
                        {i18n.t("add_to_cart")}
                      </button>
                    )}
                  </div>
                  <div>
                    <p style={{ lineHeight: "2.4rem" }}>
                      <strong style={{ fontSize: "16px" }}>
                        {" "}
                        {i18n.t("crypto")}:
                      </strong>{" "}
                      {i18n.t("crypto_blog_explanation")}
                    </p>
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
                    // Forex
                    width:
                      windowWidth >= 900
                        ? boxWidth.toString() + "px"
                        : windowWidth.toString() + "px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: windowWidth >= 900 ? "0px 20px" : "0px 0px",
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
                    <h3>{i18n.t("forex")}</h3>
                  </div>
                  <div style={{ padding: "15px" }}>
                    <img
                      src="/assets/img/elma.png"
                      alt=""
                      className="icon-120 "
                    />
                  </div>
                  <div>
                    <Radio.Group onChange={onForexChange} value={forexValue}>
                      <Space direction="vertical">
                        <Radio value={1}>
                          <span style={{ color: "white", fontSize: "20px" }}>
                            500 {i18n.t("unit_month")}
                          </span>
                        </Radio>
                        <Radio value={2}>
                          <span style={{ color: "white", fontSize: "20px" }}>
                            1250 {i18n.t("unit_three_months")}
                          </span>
                        </Radio>
                        <Radio value={3}>
                          <span style={{ color: "white", fontSize: "20px" }}>
                            3500 {i18n.t("unit_twelve_months")}
                          </span>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </div>
                  <div style={{ padding: "15px" }}>
                    {isForexPurchased ? (
                      <span style={{ color: "white", fontSize: "20px" }}>
                        {i18n.t("purchased")}
                      </span>
                    ) : (
                      <button
                        className="bg-secondaryColor"
                        type="submit"
                        style={{ padding: "10px 20px" }}
                        onClick={() => handleSubmit("forex", forexValue)}
                      >
                        {i18n.t("add_to_cart")}
                      </button>
                    )}
                  </div>
                  <div>
                    <p style={{ lineHeight: "2.4rem" }}>
                      <strong style={{ fontSize: "16px" }}>
                        {" "}
                        {i18n.t("forex")}:
                      </strong>{" "}
                      {i18n.t("forex_blog_explanation")}
                    </p>
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
                    // All Markets
                    width:
                      windowWidth >= 900
                        ? boxWidth.toString() + "px"
                        : windowWidth.toString() + "px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: windowWidth >= 900 ? "0px 20px" : "0px 0px",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ marginBottom: "10px" }}>
                    <h3>{i18n.t("all_markets")}</h3>
                  </div>
                  <div style={{ padding: "15px" }}>
                    <img
                      src="/assets/img/elma.png"
                      alt=""
                      className="icon-120 "
                    />
                  </div>
                  <div>
                    <Radio.Group
                      onChange={onAllMarketsChange}
                      value={allMarketsValue}
                    >
                      <Space direction="vertical">
                        <Radio value={1}>
                          <span style={{ color: "white", fontSize: "20px" }}>
                            750 {i18n.t("unit_month")}
                          </span>
                        </Radio>
                        <Radio value={2}>
                          <span style={{ color: "white", fontSize: "20px" }}>
                            1750 {i18n.t("unit_three_months")}
                          </span>
                        </Radio>
                        <Radio value={3}>
                          <span style={{ color: "white", fontSize: "20px" }}>
                            4500 {i18n.t("unit_twelve_months")}
                          </span>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </div>
                  <div style={{ padding: "15px" }}>
                    {isAllMarketsPurchased ? (
                      <span style={{ color: "white", fontSize: "20px" }}>
                        {i18n.t("purchased")}
                      </span>
                    ) : (
                      <button
                        className="bg-secondaryColor"
                        type="submit"
                        style={{ padding: "10px 20px" }}
                        onClick={() =>
                          handleSubmit("all_markets", allMarketsValue)
                        }
                      >
                        {i18n.t("add_to_cart")}
                      </button>
                    )}
                  </div>
                  <div style={{ width: "40px", height: "40px" }}></div>
                </div>
              </div>
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

export default Blog;
