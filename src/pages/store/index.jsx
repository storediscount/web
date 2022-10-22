import Head from "next/head";
import {useRouter} from "next/router";
import {Block, BlockTitle, Link, List, ListItem, Navbar, Page} from "konsta/react";
import titleFormatter from "../../helpers/titleFormatter";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {getObjectByID} from "../../helpers/utility";
import axios from "axios";
import {useEffect, useState} from "react";

export default function StoreList({stores}) {
    const router = useRouter()
    const [filtered_stores, setFilteredStores] = useState(stores)
    const [search, setSearch] = useState('')
    useEffect(()=>{
        setFilteredStores(stores.filter(store => (store.name+store.description).includes(search)))
    }, [search])
    return (
        <Page>
            <Head>
                <title>{titleFormatter("商店清單")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter("商店清單")}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon
                        className={"h-4 w-4"}/>返回</Link>}/>

            <div className={"mx-4 mt-2"}>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                    搜尋字串
                </label>
                <div className="mt-1">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="新竹必點"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <BlockTitle>商家列表</BlockTitle>
            <List strongIos outlineIos>
                {filtered_stores?.map(store => (
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