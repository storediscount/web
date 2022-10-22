import Head from "next/head";
import titleFormatter from "../../../helpers/titleFormatter";
import {Block, Navbar, Page, Link, BlockTitle, List, ListItem, Button} from "konsta/react";
import Map from "../../../components/Map";
import styles from "../../../../styles/Home.module.css";
import data from "../../../assets/data.json";
import {ChevronLeftIcon, HandThumbDownIcon, HandThumbUpIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import UserStoreInvoiceList from "../../../components/UserStoreInvoiceList";
import {useState} from "react";
import {Popup} from "konsta/react";

export default function Order({place: {id, name, img, items}}) {
    const router = useRouter()
    const [popupOpened, setPopupOpened] = useState(false);

    let order = {
        storeID: 0,
        item: [
            {
                id: 1,
                amount: 1
            },
            {
                id: 2,
                amount: 2
            }
        ]
    }

    return (
        <Page>
            <Head>
                <title>{titleFormatter(name)}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter(name)}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}/>


            <BlockTitle>商品列表</BlockTitle>
            <List strongIos outlineIos>
                {items.map(item => (
                    <ListItem
                        link
                        // href={`/store/${sid}`}
                        chevronMaterial={false}
                        title={item.name}
                        //after={item.name}
                        //subtitle={item.description}
                        text={item.description}
                        //text={"../images/store/" + getStoreByID(sid).img}
                        media={
                            <img
                                className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                                src={"../images/items/" + item.img}
                                width="90"
                                alt="demo"
                            />
                        }
                    />
                ))}
            </List>

            <Button onClick={() => setPopupOpened(true)}>檢視您的購物車</Button>

            <Popup opened={popupOpened} onBackdropClick={() => setPopupOpened(false)}>
                <Page>
                    <Navbar
                        title="檢視您的購物車"
                        right={
                            <Link navbar onClick={() => setPopupOpened(false)}>
                                Close
                            </Link>
                        }
                    />
                    <Block className="space-y-4">
                        {
                            order.item.map(it => <p>{items.find(i => it.id === i.id)}*{it.amount}</p>)
                        }
                    </Block>
                </Page>
            </Popup>
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