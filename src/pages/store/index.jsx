import Head from "next/head";
import {useRouter} from "next/router";
import {Block, BlockTitle, Link, List, ListItem, Navbar, Page} from "konsta/react";
import titleFormatter from "../../helpers/titleFormatter";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {getObjectByID} from "../../helpers/utility";
import axios from "axios";

export default function StoreList({stores}) {
    const router = useRouter()
    return (
        <Page>
            <Head>
                <title>{titleFormatter("商店清單")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter("商店清單")}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon
                        className={"h-4 w-4"}/>返回</Link>}/>

            <BlockTitle>商家列表</BlockTitle>
            <List strongIos outlineIos>
                {stores?.map(store => (
                    <ListItem
                        link
                        href={`/store/${store.id}`}
                        chevronMaterial={false}
                        title={store.name}
                        after={store.name}
                        subtitle={store.name}
                        text={"../images/store/" + store.img}
                        media={
                            <img
                                className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                                src={"../images/store/" + store.img}
                                width="90"
                                alt="demo"
                            />
                        }
                    />
                ))}
            </List>
        </Page>
    )
}

export async function getStaticProps() {
    const {data} = await axios.get("/stores", {
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT + '/api'
    })
    //console.log(data)
    return {
        props: {
            stores: data
        }
    };
}