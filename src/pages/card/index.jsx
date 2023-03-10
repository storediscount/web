import Head from "next/head";
import titleFormatter from "../../helpers/titleFormatter";
import {Link, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";

export default function () {
    const name = "會員卡";
    const router = useRouter();
    return (
        <Page>
            <Head>
                <title>{titleFormatter(name)}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter(name)}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon
                        className={"h-4 w-4"}/>返回</Link>}/>

            <div className={"bg-gray-200 p-4 mx-2 cursor-pointer"} onClick={()=>router.push('/card/1')}>
                hi
            </div>
        </Page>
    )
}