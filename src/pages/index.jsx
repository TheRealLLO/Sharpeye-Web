import React, { useEffect } from 'react';
import Head from 'next/head';
//= Layout
import MainLayout from 'layouts/Main';
//= Components
import Header from '@components/Crypto/Header';
import Features from '@components/Crypto/Features';
import About from '@components/Crypto/About';
import Markets from '@components/Crypto/Markets';
import Team from '@components/Crypto/Team';
import FAQ from '@components/Crypto/FAQ';
import Footer from '@components/Crypto/Footer';
import { useTranslation } from 'next-i18next';

import tr from "../../public/locales/tr/common.json"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import { i18n } from 'next-i18next'

const HomeCrypto = () => {
  useEffect(() => {
    document.body.classList.add('home-style-15');
    return () => document.body.classList.remove('home-style-15');
  }, []);

  let langFile = tr


  return (
    <>
      <Head>
        <title>SharpEye Trading</title>
      </Head>
      <MainLayout>
        <Header lang={langFile} />
        <main>
          <Features lang={langFile} />
          <About lang={langFile} />
          <Markets />
          {/* <Timeline /> */}
          <Team />
          {/* <FAQ lang={langFile} /> */}
          {/* <Blog /> */}
        </main>
        <Footer lang={langFile} />
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

export default HomeCrypto;