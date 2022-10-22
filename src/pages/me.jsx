import Head from "next/head";
import {useRouter} from "next/router";
import {Link, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useEffect} from "react";
import titleFormatter from "../helpers/titleFormatter";

export default function Me() {
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem('token')
    })

    return (
        <Page>
            <Head>
                <title>{titleFormatter("我的")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter("我的")}
                    left={<Link onClick={() => router.back()} navbar>
                        <ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}/>

        </Page>
    )
}