import Head from "next/head";
import data from "../../assets/data.json"
import titleFormatter from "../../helpers/titleFormatter";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {BlockTitle, Link, List, Navbar, Page} from "konsta/react";
import {useRouter} from "next/router";

const vip_store = [data[0], data[2]]


export default function VIPList() {
    const router = useRouter()
    return (
        <Page>
            <Head>
                <title>{titleFormatter("熟客商家")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar
                title={titleFormatter("熟客商家")}
                left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}
            />

            <BlockTitle>熟客商家</BlockTitle>
            <List strongIos outlineIos>
                {vip_store.map((store) => (
                    <div className={"bg-white px-4 my-4 border-b border-gray-200"}
                         key={store.id}
                    >
                        <div>
                            <div className={"text-lg font-bold"}>{store.name}</div>
                            <div>消費總額： {Math.floor(Math.random() * 9000)}</div>
                            <div>折扣%數： {Math.floor(Math.random() * 30)+1}%</div>
                        </div>
                    </div>
                ))}
            </List>
        </Page>
    )
}