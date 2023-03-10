import Head from "next/head";
import titleFormatter from "../../helpers/titleFormatter";
import {Link, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";

export default function () {
    const name = "會員卡";
    const router = useRouter();
    const tabs = [
        {profilePic: 'https://i.imgur.com/OVyy1m5.jpeg', name: '粒徑豆花'},
        {profilePic: 'https://i.imgur.com/OVyy1m5.jpeg', name: '開源社'},
        {profilePic: 'https://i.imgur.com/OVyy1m5.jpeg', name: '白鬍子牛排'},
    ]
    return (
        <Page>
            <Head>
                <title>{titleFormatter(name)}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter(name)}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon
                        className={"h-4 w-4"}/>返回</Link>}/>
            {tabs.map((tab, i) => (
                <div
                    key={tab.name}
                    className={"flex flex-col items-center justify-center bg-gray-200 p-4 mx-2 my-1 h-[140px] cursor-pointer rounded-lg brightness-75"}
                    onClick={() => router.push('/card/1')}
                >
                    <div className={"flex flex-col items-center"}>
                        <div className={"h-[50px] w-[50px] rounded brightness-200 drop-shadow"}
                             style={{backgroundImage: `url('${tab.profilePic}')`}}></div>
                        <span style={{fontSize: "10px"}}>{tab.name}</span>
                    </div>
                </div>
            ))}
            </Page>
    )
}