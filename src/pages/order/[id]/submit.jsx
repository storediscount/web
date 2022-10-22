import Head from "next/head";
import titleFormatter from "../../../helpers/titleFormatter";
import {Block, Navbar, Page, Link, BlockTitle, List, ListItem, Button} from "konsta/react";
import data from "../../../assets/data.json";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Popup} from "konsta/react";
import QRCode from "react-qr-code";

export default function OrderSubmit({place: {id}}) {
    const router = useRouter()
    const [popupOpened, setPopupOpened] = useState(false);
    const [order, setOrder] = useState([])
    useEffect(()=>{
        setOrder(JSON.parse(localStorage.getItem("order")) || [])
    }, [router])

    return (
        <Page>
            <Head>
                <title>{titleFormatter("建立訂單")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter("建立訂單")}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}/>

            <Block>
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={JSON.stringify({
                        store: id,
                        order
                    })}
                    viewBox={`0 0 256 256`}
                />
            </Block>
        </Page>
    )
}

export async function getStaticPaths() {
    return {
        paths: data.map((place) => ({
            params: {
                id: place.id.toString(),
            }
        })),
        fallback: false
    };
}

export async function getStaticProps(context) {
    const {id} = context.params;
    let place = data.find((place) => place.id === id);
    if (typeof place === "undefined") {
        return {
            notFound: true
        }
    }
    return {
        props: {
            place
        }
    };
}