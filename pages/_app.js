import '../styles/globals.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import {useEffect, useState} from "react";
import axios from "axios";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [configData, setConfigData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.thumuaruouhn.online/Config/View-Config', {
          headers: {
            'Accept': 'text/plain',
          },
        });

        setConfigData(response.data.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);
  return ( <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet"/>
    </Head>
    <DefaultSeo {...SEO} />
    <Header configData={configData}></Header>
    <Component {...pageProps} />
    <Footer configData={configData}></Footer>
  </>)
}

export default MyApp
