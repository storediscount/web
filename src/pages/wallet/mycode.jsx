import Head from "next/head";
import {Block, BlockTitle, List, ListItem, Navbar, Page} from "konsta/react";
import Html5QrcodePlugin from "../../components/QRCodeScanner";
import QRCode from "react-qr-code";

export default function WalletDetail() {

    return (
        <Page>
            <Head>
                <title>我的條碼</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title="App"/>

            <BlockTitle>我的條碼</BlockTitle>
            <Block>
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={"234"}
                    viewBox={`0 0 256 256`}
                />
            </Block>
        </Page>
    )
}