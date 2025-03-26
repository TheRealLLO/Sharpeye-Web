import React from "react";
import Script from "next/script";
import Head from "next/head";
import "../styles/globals.css";

import { appWithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "contexts/cartContext/cart-context";
import { ConfigProvider } from "antd";
import theme from "../theme/themeConfig";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Iteck</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <SessionProvider
        // Provider options are not required but can be useful in situations where
        // you have a short session maxAge time. Shown here with default values.
        session={pageProps.session}
      >
        <CartProvider>
          <ConfigProvider theme={theme}>
            <Component {...pageProps} />
          </ConfigProvider>
        </CartProvider>
      </SessionProvider>

      <Script
        strategy="beforeInteractive"
        src="/assets/js/lib/pace.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/lib/bootstrap.bundle.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/lib/mixitup.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/lib/wow.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/lib/html5shiv.min.js"
      ></Script>
      <Script strategy="lazyOnload" src="/assets/js/main.js"></Script>
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default appWithTranslation(MyApp);
