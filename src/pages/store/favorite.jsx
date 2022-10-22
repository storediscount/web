import Head from "next/head";
import data from "../../assets/data.json"
import titleFormatter from "../../helpers/titleFormatter";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {BlockTitle, Link, List, ListItem, Navbar, Page} from "konsta/react";
import {useRouter} from "next/router";
import DetailRecord from "../../components/DetailRecord";
import transactionRecord from "../../assets/transaction_record_dummy_data.json"

const vip_store = [data[0], data[2]]


export default function VIPList() {
    const router = useRouter()
    return (
        <Page>
            <Head>
                <title>{titleFormatter("收藏商家")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar
                title={titleFormatter("收藏商家")}
                left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}
            />

            <BlockTitle>收藏商家</BlockTitle>
            <List strongIos outlineIos>
                {vip_store.map((store) => (
                    <div className={"bg-white px-4 py-2 border-b border-gray-200"}
                         key={store.id}
                    >
                        <div>
                            <div className={"text-lg font-bold"}>{store.name}</div>
                            <Link href={"/store/" + store.id} >查看更多</Link>
                        </div>
                    </div>
                ))}
            </List>
        </Page>
    )
}