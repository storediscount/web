import { App } from 'konsta/react';
import '../../styles/globals.css'
import Head from "next/head";

function MyApp({Component, pageProps}) {
    return <App theme="ios">
        <Head>
            <meta name="application-name" content="MaPay 食支旅圖" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="MaPay 食支旅圖" />
            <meta name="description" content="MaPay 食支旅圖" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-config" content="/icons/browserconfig.xml" />
            <meta name="msapplication-TileColor" content="#2B5797" />
            <meta name="msapplication-tap-highlight" content="no" />
            <meta name="theme-color" content="#000000" />

            <link rel="apple-touch-icon" href="/icon/ios/80.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/icon/ios/152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/icon/ios/180.png" />
            <link rel="apple-touch-icon" sizes="167x167" href="/icon/ios/167.png" />

            <link rel="icon" type="image/png" sizes="32x32" href="/icon/ios/32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/icon/ios/16.png" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        </Head>
        <Component {...pageProps} />
    </App>
}

export default MyApp
