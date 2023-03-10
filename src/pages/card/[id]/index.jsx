import Head from "next/head";
import titleFormatter from "../../../helpers/titleFormatter";
import {Link, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import Image from "next/image";
import {BuildingOffice2Icon, NewspaperIcon} from "@heroicons/react/20/solid";
import {useState} from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function () {
    const name = "米塔會員";
    const router = useRouter();
    const tabs = [
        {name: '點數', count: 25},
        {name: '禮物卷', count: 30},
        {name: '品牌動態', count: <NewspaperIcon/>},
        {name: '品牌資訊', count: <BuildingOffice2Icon/>},
    ]
    const [selectedTab, setSelectedTab] = useState(0)
    return (
        <Page>
            <Head>
                <title>{titleFormatter(name)}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter(name)}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon
                        className={"h-4 w-4"}/>返回</Link>}/>

            <div className={"flex flex-col justify-center items-center px-2 py-2 bg-gray-200"}>
                <div className={"flex flex-row justify-center items-center rounded-xl bg-gray-400 py-5 w-full"}>
                    <div className={"flex flex-col items-center"}>
                        <Image src={"/logo.png"} width={80} height={80} className={"rounded-xl"}/>
                        <div className={"text-lg"}>米塔集團</div>
                        <div className={"text-sm"}>網路會員</div>
                    </div>
                </div>

                <div>
                    <div className="block">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                {tabs.map((tab, i) => (
                                    <div
                                        key={tab.name}
                                        className={classNames(
                                            i === selectedTab
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                            'inline-flex flex-col items-center cursor-pointer whitespace-nowrap border-b-2 pt-4 pb-2 px-1 text-sm font-medium'
                                        )}
                                        onClick={() => setSelectedTab(i)}
                                        aria-current={i === selectedTab ? 'page' : undefined}
                                    >
                                        <div className={"h-5 w-5"}>{tab.count}</div>
                                        <div>{tab.name}</div>
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"p-4"}>
                {selectedTab === 0 &&
                    <div className={"flex flex-col"}>
                        <div>【米塔極點去】</div>
                        <div>消費滿100元即可累積1點</div>


                        <span className={"mt-4 font-bold"}>即將到期點數</span>
                        <div className={"flex flex-row justify-between items-center"}>
                            <div className={"text-gray-600"}>到期日： 2023/06/30</div>
                            <span className={"text-red-500 text-3xl font-bold"}>0<span className={"text-sm"}>點</span></span>
                        </div>

                        <span className={"mt-4 font-bold"}>點數兌換</span>
                        <div className={"flex flex-col gap-2 mb-2"}>
                            <div className={"flex flex-row rounded-lg items-center bg-indigo-500 p-3"}>
                                <div className={"flex flex-row justify-between items-center w-full"}>
                                    <div className={"text-white"}>黑糖奶茶</div>
                                    <div className={"text-white text-3xl font-bold"}>0<span className={"text-sm"}>點</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Page>
    )
}