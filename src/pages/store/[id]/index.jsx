import Head from "next/head";
import titleFormatter from "../../../helpers/titleFormatter";
import {Block, Navbar, Page, Link, BlockTitle, List, ListItem} from "konsta/react";
import Map from "../../../components/Map";
import styles from "../../../../styles/Home.module.css";
import data from "../../../assets/data.json";
import transactionRecord from "../../../assets/transaction_record_dummy_data.json"
import {
    BookmarkIcon,
    ChevronLeftIcon,
    HandThumbDownIcon,
    HandThumbUpIcon,
    HeartIcon
} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import DetailRecord from "../../../components/DetailRecord";
import UserStoreInvoiceList from "../../../components/UserStoreInvoiceList";
import Image from "next/image";

export default function Store({place: {id, lat, lng, name, img}}) {
    const router = useRouter()
    return (
        <Page>
            <Head>
                <title>{titleFormatter(name)}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter(name)}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon
                        className={"h-4 w-4"}/>返回</Link>}/>
            {/*<Block>*/}
                <Map className={styles.homeMap} center={[lat, lng]} zoom={20}>
                    {({TileLayer, Marker, Popup}) => (
                        <>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                            <Marker position={[lat, lng]}>
                                <Popup>
                                    {name}
                                </Popup>
                            </Marker>
                        </>
                    )}
                </Map>
            {/*</Block>*/}
            <Block strong inset outline>
                <img src={"/images/store/"+img}/>
            </Block>

            <BlockTitle>商家資訊</BlockTitle>
            <Block strong>
                <div className={"flex flex-row items-center justify-between"}>
                    <div className={"flex flex-row items-center"}>
                        <HandThumbUpIcon className={"h-4 w-4"}/> {Math.floor(Math.random() * 50) + 25} &nbsp;
                        <HandThumbDownIcon className={"h-4 w-4"}/> {Math.floor(Math.random() * 25)}
                    </div>
                    <BookmarkIcon className={"h-6 w-6 cursor-pointer"}></BookmarkIcon>
                </div>
                <p>
                    <strong>商家名稱:</strong> {name}
                </p>
            </Block>

            <BlockTitle>消費紀錄</BlockTitle>
            <List strongIos outlineIos>
                {transactionRecord.filter((record) => record.storeId === id).map((record) => (
                    <ListItem
                        key={record.id}
                        text={
                            <DetailRecord items={record.items} total={record.total} storeId={record.storeId}
                                          router={router}/>
                        }
                    />
                ))}
            </List>

            <BlockTitle>成為熟客</BlockTitle>
            <List strongIos outlineIos>
                <ListItem
                    title="VIP"
                    text="訂單 98 折"
                />
                <ListItem
                    title="VVIP"
                    text="訂單 95 折，且享有生日贈禮"
                />
                <ListItem
                    title="VVVIP"
                    text="訂單 92 折，且享有生日贈禮"
                />
            </List>

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