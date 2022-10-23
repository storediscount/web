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
import customerLevel from "../../../assets/customer_level.json"
import {useState} from "react";
import {flushSync} from "react-dom";
// import {BlockColors} from "konsta/shared/esm/colors/BlockColors";

export default function Store({place: {id, lat, lng, name, img, vip}}) {
    const router = useRouter()
    const [isUpvoted, setUpvoted] = useState(false)
    const [isDevoted, setDevoted] = useState(false)
    const [initUpvoted, setInitUpvoted] = useState(Math.floor(Math.random() * 50) + 25)
    const [initDevoted, setInitDevoted] = useState(Math.floor(Math.random() * 25))

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
            {/*<Block strong inset outline>*/}
            {/*    <img src={"/images/store/"+img}/>*/}
            {/*</Block>*/}

            <BlockTitle>商家資訊</BlockTitle>
            <Block strong>
                <div className={"flex flex-row items-center justify-between"}>
                    <div className={"p-2 flex flex-row items-center"}>
                        <HandThumbUpIcon

                            className={`h-8 w-8 ${isUpvoted && 'text-red-300'}`}
                            onClick={() => {
                                setDevoted(false)
                                setUpvoted(!isUpvoted)
                            }}
                        />
                        {initUpvoted + isUpvoted} &nbsp;
                        <HandThumbDownIcon
                            className={`h-8 w-8 ${isDevoted && 'text-red-300'}`}
                            onClick={() => {
                                setUpvoted(false)
                                setDevoted(!isDevoted)
                            }}
                        />
                        {initDevoted + isDevoted}
                    </div>
                    <BookmarkIcon className={"h-6 w-6 cursor-pointer"}></BookmarkIcon>
                </div>
                <p className='p-2'>
                    <strong>商家名稱:</strong> {name}
                </p>
            </Block>

            <BlockTitle>成為熟客</BlockTitle>
            <Block>
                <p>{"您現在的熟客等級：" + vip[customerLevel[0][id]].name}</p>
            </Block>
            <List strongIos outlineIos>
                {
                    vip.map(each_level => (
                        <ListItem
                            title={each_level.name}
                            text={each_level.description}
                        />
                    ))
                }
            </List>


            <BlockTitle>消費紀錄</BlockTitle>
            <List strongIos outlineIos>
                {transactionRecord.filter((record) => record.storeId === id).map((record) => (
                    <ListItem
                        key={record.id}
                        text={
                            <DetailRecord items={record.items} total={record.total} storeId={record.storeId}
                                        discount={record.discountValue}/>
                        }
                    />
                ))}
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