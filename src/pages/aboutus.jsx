import React, { useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '@layouts/Main';
import Footer from '@components/Crypto/Footer';
import { i18n } from 'next-i18next'
import TopNav from '@components/Navbars/TopNav-15';
import Navbar from '@components/Navbars/CryptoNav';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
const AboutUs = () => {
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
                <header style={{ marginBottom: "60px" }} className="style-15">
                    <div className="navs-container">
                        <TopNav />
                        <Navbar />
                    </div>
                </header>
                <main>
                    <section id="aboutus" className='style-15'>
                        <div className='container'>
                            <div id="oguz" style={teamStyle} className="team-people team-card wow fadeInUp">
                                <div className='col-lg-6'>
                                    <img src="/assets/img/oguz.jpg" alt="" />
                                </div>
                                <div className='col-lg-6'>
                                    <p>
                                        {i18n.t('oguz')}
                                    </p>
                                </div>
                            </div>
                            <div id="ata" style={teamStyle} className="team-people team-card wow fadeInUp">
                                <div className='col-lg-6'>
                                    <img src="/assets/img/ata.jpg" alt="" />
                                </div>
                                <div className='col-lg-6'>
                                    <p>

                                        {i18n.t('ata')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </MainLayout>
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
const teamStyle = {
    display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "50px", margin: "80px 10px", padding: "80px 0px"
}

export default AboutUs;