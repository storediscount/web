import Head from "next/head";
import {BlockTitle, List, ListItem, Navbar, Page} from "konsta/react";
import Html5QrcodePlugin from "../../components/QRCodeScanner";
import titleFormatter from "../../helpers/titleFormatter";

export default function WalletDetail() {
    const result = (res) => {
        alert(JSON.stringify(res))
    }
    return (
        <Page>
            <Head>
                <title>{titleFormatter("掃碼支付")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter("掃碼支付")}/>

            <BlockTitle>掃碼支付</BlockTitle>
            <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={result}/>
        </Page>
    )
}