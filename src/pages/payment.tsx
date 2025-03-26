import React, { useEffect, useState } from "react";
import Head from "next/head";
import MainLayout from "@layouts/Main";
import Footer from "@components/Crypto/Footer";
import TopNav from "@components/Navbars/TopNav-15";
import Navbar from "@components/Navbars/CryptoNav";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";
import axios from "axios";
import Script from "next/script";
import { useRouter } from "next/router";
import { useCart } from "hooks/useCart";

const Profile = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [scripts, setScripts] = useState<{ s: string; k: string }[]>([]);
  
  const { cartItems, addToCart, address, setBillingAddress, email } = useCart();
  
  useEffect(() => {
    document.body.classList.add("home-style-15");
    return () => document.body.classList.remove("home-style-15");
  }, []);

  useEffect(() => {
    const foo = async () => {
      try {
        const { data: paymentResponse } = await axios.post(
          `/api/checkout-form`,
          {cartItems, address, email},
        );
        console.log({
          msg: "got response form checkout form",
          paymentResponse,
        });
        if (paymentResponse.status === "failure") {
          setTimeout(() => {
            router.reload();
          }, 5000);
          alert(paymentResponse.error_message);
        }
        const formResponse = paymentResponse.script;
        if (formResponse) {
          console.log("asdb", formResponse);
          const scripts_ = formResponse
            .split("</script>")
            .filter((a: any) => !!a)
            .map((a: any) => ({
              s: a.replace('<script type="text/javascript">', ""),
              k: paymentResponse.form.systemTime.toString(),
            }));
          setScripts(scripts_);
        }
      } catch (e) {
        alert(
          e?.response?.data?.message ??
            e.message ??
            "Error creating payment form"
        );
      }
    };
    foo();
    return () => {
      setScripts([]);
      router.reload();
    };
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
              {scripts.map((script, index) => (
                <Script
                  key={script.k}
                  id={`payment_form${script.k}`}
                  dangerouslySetInnerHTML={{ __html: script.s }}
                />
              ))}
              <div id="iyzipay-checkout-form" className="responsive" />
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
