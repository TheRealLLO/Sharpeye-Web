import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import MainLayout from '@layouts/Main';
import Footer from '@components/Crypto/Footer';
import TopNav from '@components/Navbars/TopNav-15';
import Navbar from '@components/Navbars/CryptoNav';
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
const Contact = () => {
    const [formVisible, setFormVisible] = useState(true)
    useEffect(() => {
        document.body.classList.add('home-style-15');
        return () => document.body.classList.remove('home-style-15');
    }, []);



    async function formSubmit(e) {
        e.preventDefault()
        document.getElementById("button").innerHTML = "Gönderiliyor..."
        const formData = {}
        Array.from(e.currentTarget.elements).forEach(field => {
            if (!field.name) return;
            formData[field.name] = field.value
        });


        fetch('/api/mail_contact', {
            method: "post",
            body: JSON.stringify(formData)
        })
            .then((response) => {


                setFormVisible(false)

            })
            .catch((error) => {
                console.log(error)
            })

    }
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
                        <div className="container" style={{ textAlign: "center", display: "flex", flexDirection: "column" }}>
                            <h2 className="fs-1"> {i18n.t('footer_contact')} </h2>

                            {formVisible ? (
                                <>
                                    <form className='contact-form' method='post' onSubmit={formSubmit}>
                                        <p>
                                            <label htmlFor='name'>{i18n.t('contact_name')}</label>
                                            <input type='text' name='name' />
                                        </p>
                                        <p>
                                            <label htmlFor='email'>Email</label>
                                            <input type='email' name='email' />
                                        </p>
                                        <p>
                                            <label htmlFor='message'>{i18n.t('contact_message')}</label>
                                            <textarea name='message' />
                                        </p>
                                        <p>
                                            <button id='button'>{i18n.t('contact_send')}</button>
                                        </p>
                                    </form>
                                </>

                            ) : (<>

                                <a style={{ marginTop: "50px" }}>{i18n.t('contact_succ')}</a>

                            </>)}
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

export default Contact;