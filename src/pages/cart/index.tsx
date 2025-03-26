import React, { use, useEffect, useState } from "react";
import Head from "next/head";
import MainLayout from "@layouts/Main";
import Footer from "@components/Crypto/Footer";
import TopNav from "@components/Navbars/TopNav-15";
import Navbar from "@components/Navbars/CryptoNav";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";
import { useCart } from "hooks/useCart";
import { i18n } from "next-i18next";
import useSize from "../../hooks/useSize";
import { useRouter } from "next/router";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const Cart = () => {
  //TODO: Palkim- add i18n after POC
  const { cartItems, removeFromCart, clearCart } = useCart();
  const windowSize = useSize();
  const router = useRouter();

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
                <h2 className="fs-1"> {i18n.t("cart")} </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-evenly",
                    borderBottom: "1px solid white",
                    paddingBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <span style={{ flex: 1, textAlign: "center" }}>Product</span>
                  <span style={{ flex: 1, textAlign: "center" }}>Price</span>
                  <div
                    style={{
                      width: "100px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={() => clearCart()}
                    />
                    <span>Clear Cart</span>
                  </div>
                </div>

                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-evenly",
                      marginTop: "10px",
                    }}
                  >
                    <span style={{ flex: 1, textAlign: "center" }}>
                      {item.name}
                    </span>
                    <span style={{ flex: 1, textAlign: "center" }}>
                      {item.price}
                    </span>
                    <div style={{ width: "100px" }}>
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => removeFromCart(item.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "100px",
                  color: "white",
                  width: "100%",
                }}
              >
                <button
                  style={{
                    backgroundColor: "#00c057",
                    width: "20%",
                    padding: "10px",
                  }}
                  onClick={() => router.push("/cart/2")}
                >
                  Next
                </button>
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

export default Cart;
