import React, { useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '@layouts/Main';
import Footer from '@components/Crypto/Footer';
import TopNav from '@components/Navbars/TopNav-15';
import Navbar from '@components/Navbars/CryptoNav';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
const CopyTrade = () => {
    useEffect(() => {
        document.body.classList.add('home-style-15');
        return () => document.body.classList.remove('home-style-15');
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
                    <section className=" style-15 section-padding">
                        <div className="container" style={{ textAlign: "center", display: "flex", flexDirection: "column" }}>

                            <img
                                src="/assets/img/comingsoon.jpg"
                                style={{

                                    display: 'block',
                                    height: "600px",
                                    objectFit: "contain"
                                }}
                            />

                        </div>



                    </section>
                </main>
                <Footer />
            </MainLayout >
        </>
    )
}
export const getStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}

export default CopyTrade;