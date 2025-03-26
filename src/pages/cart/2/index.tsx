import React, { useEffect, useState } from "react";
import Head from "next/head";
import MainLayout from "@layouts/Main";
import Footer from "@components/Crypto/Footer";
import TopNav from "@components/Navbars/TopNav-15";
import Navbar from "@components/Navbars/CryptoNav";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";
import { useCart } from "hooks/useCart";
import { i18n } from "next-i18next";
import useSize  from "../../../hooks/useSize";
import { useRouter } from "next/router";
import { set } from "date-fns";


const PaymentAddress = () => {
  //TODO: Palkim- add i18n after POC
  const { data: sessionData } = useSession();
  const { cartItems, addToCart, address, setBillingAddress, setBillingEmail } = useCart();
  const windowSize  = useSize();
  const windowWidth = windowSize[0];
  const router = useRouter();

  const [country, setCountry] = useState(address?.country ?? "");
  const [city, setCity] = useState(address?.city ?? ""); 
  const [addressLine, setAddressLine] = useState(address?.addressLine ?? "");
  const [postalCode, setPostalCode] = useState(address?.postalCode ?? "");
  const [email, setEmail] = useState(sessionData?.user?.email ?? "");

  useEffect(() => {
    if(!address || !email) {
      return;
    } 
    setCountry(address.country);
    setCity(address.city);
    setAddressLine(address.addressLine);
    setPostalCode(address.postalCode);
    setEmail(email);
  }, [address]);
  useEffect(() => {
    document.body.classList.add("home-style-15");
    return () => document.body.classList.remove("home-style-15");
  }, []);

  useEffect(() => {
    
  }, []);

  const handleClick = () => {
    setBillingAddress({country, city, addressLine, postalCode});
    setBillingEmail(email);
    router.push("/payment");
  }

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
              <div className="wow fadeInUp" style={{ margin: "50px 0" }}>
                <h2 className="fs-1"> {i18n.t("payment_information")} </h2>
              </div>
              <div style={{display: "flex", flexDirection: "row"}}>
                <div>
                  <h4>{i18n.t("billing_address")}</h4>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center"
                  }}>
                    <input value={country} type="text" style={{width:"500px", marginBottom:"20px"}} placeholder="Country" onChange={(e) => setCountry(e.target.value)}/>
                    <input value={city} style={{width:"500px", marginBottom:"20px"}} placeholder="City" onChange={(e) => setCity(e.target.value)}/>
                    <textarea value={addressLine} style={{width:"500px", height:"100px", marginBottom:"20px"}} placeholder="Address Line" onChange={(e) => setAddressLine(e.target.value)}/>
                    <input value={postalCode} style={{width:"500px", marginBottom:"20px"}} placeholder="Postal Code" onChange={(e) => setPostalCode(e.target.value)}/>
                  </div>
                </div>
                {!sessionData?.user?.email ?
                  <div>
                    <h4>{i18n.t("email")}</h4>
                    <input value={email} type="text" onChange={(e) => setEmail(e.target.value)}></input>
                  </div>
                  : null
                }
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"end", marginRight:"150px", marginTop:"100px", color:"white"}} >
                  <button style={{backgroundColor: "#00c057"}} onClick={() => handleClick()}>Next</button>
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

export default PaymentAddress;
