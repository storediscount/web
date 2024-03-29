import Head from "next/head";
import titleFormatter from "../../../helpers/titleFormatter";
import {Block, Navbar, Page, Link, BlockTitle, List, ListItem} from "konsta/react";
import Map from "../../../components/Map";
import styles from "../../../../styles/Home.module.css";
import data from "../../../assets/data.json";
import transactionRecord from "../../../assets/transaction_record_dummy_data.json"
import comments from "../../../assets/comments.json"
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
import {getObjectByID} from "../../../helpers/utility";
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

            <Block strong outline>
                <img src={"/images/store/"+img}/>
            </Block>

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

            <BlockTitle>留言</BlockTitle>
            <List strongIos outlineIos>
                {comments.map(comment => (
                    <ListItem
                        chevronMaterial={false}
                        title={comment.name + " : "}
                        text={comment.description}
                        media={
                            <img
                                className="ios:rounded-lg material:rounded-full"
                                src={"/logo.png"}
                                width="50"
                                alt="demo"
                            />
                        }
                        innerChildren={<div className={"flex flex-row"}>
                            <HandThumbUpIcon className={'h-6 w-6'}/>
                            {7 + Math.ceil(Math.random() * 10)} &nbsp;
                            <HandThumbDownIcon className={'h-6 w-6'}/>
                            {Math.ceil(Math.random() * 5)}
                        </div>}
                    />
                ))}
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