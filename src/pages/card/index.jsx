import Head from "next/head";
import titleFormatter from "../../helpers/titleFormatter";
import {Link, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import Image from "next/image";

export default function () {
    const name = "會員卡";
    const router = useRouter();
    const tabs = [
        {profilePic: '/logo.png', name: '立晉豆花'},
        {profilePic: '/logo.png', name: '開源社'},
        {profilePic: '/logo.png', name: '白鬍子牛排'},
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
            <div className={"flex flex-col gap-2"}>
                {tabs.map((tab, i) => (
                    <div
                        key={tab.name}
                        className={"flex flex-col items-center justify-center bg-gray-300 p-4 mx-2 my-1 h-[140px] cursor-pointer rounded-lg shadow-sm"}
                        onClick={() => router.push('/card/1')}
                    >
                        <div className={"flex flex-col items-center"}>
                            <Image src={tab.profilePic} height={60} width={60} className={'rounded-lg'}></Image>
                            <span style={{fontSize: "10px"}}>{tab.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Page>
    )
}