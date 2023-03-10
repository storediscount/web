import Head from "next/head";
import titleFormatter from "../../../helpers/titleFormatter";
import {Link, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon, ClockIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import Image from "next/image";
import {BuildingOffice2Icon, EyeIcon, HeartIcon, NewspaperIcon} from "@heroicons/react/20/solid";
import {useState} from "react";
import {InformationCircleIcon} from "@heroicons/react/24/solid";

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
                            <span className={"text-red-500 text-3xl font-bold"}>0<span
                                className={"text-sm"}>點</span></span>
                        </div>

                        <span className={"mt-4 font-bold"}>點數兌換</span>
                        <div className={"flex flex-col gap-2 mb-2"}>
                            <div className={"flex flex-row rounded-lg items-center bg-indigo-500 p-3"}>
                                <div className={"flex flex-row justify-between items-center w-full"}>
                                    <div className={"text-white"}>黑糖奶茶</div>
                                    <div className={"text-white text-3xl font-bold"}>0<span
                                        className={"text-sm"}>點</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {selectedTab === 1 &&
                    <div className={"flex flex-col"}>
                        <div className={"flex flex-col items-center gap-1 mb-2"}>
                            <div className={"flex flex-row rounded-md items-center bg-indigo-500 p-3 w-full"}>
                                <div className={"flex flex-row justify-between items-center w-full"}>
                                    <div className={"text-white"}>黑糖奶茶</div>
                                    <div className={"text-white text-3xl font-bold"}>0<span
                                        className={"text-sm"}>點</span></div>
                                </div>
                            </div>
                            <div className={"font-bold"}>WBC經典賽，為中華健兒一起加油 #牛排</div>
                            <div className={"text-gray-500 flex flex-row items-center"}><ClockIcon
                                className={"h-5 w-5"}/> 2021/06/30 22:00 到期
                            </div>
                        </div>
                    </div>
                }
                {selectedTab === 2 &&
                    <div className={"flex flex-col"}>

                        <div className={"flex flex-col rounded-md mb-2 bg-white shadow-lg"}>
                            <div className={"flex flex-row items-center bg-indigo-500 p-3 w-full h-24"}>

                            </div>
                            <div className={"font-bold w-full text-center mt-2"}>政府發現金 來米塔吃貨慶</div>
                            <div className={"text-gray-500 w-full text-sm text-center"}>2023/02/04</div>
                            <div className={"p-4"}>
                                <div className={""}>
                                    31週年慶，歡迎各位來用餐

                                </div>
                                <div className={"flex flex-row justify-between items-center"}>
                                    <div className={"inline-flex items-center text-gray-500"}>
                                        <HeartIcon
                                            className={"h-5 w-5"}/>9
                                    </div>
                                    <div className={"inline-flex items-center text-gray-500"}>
                                        <EyeIcon
                                            className={"h-5 w-5"}/>繼續閱讀
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                }
                {selectedTab === 3 &&
                    <div className={"flex flex-col"}>
                        <div className={"flex flex-col rounded-md mb-2 bg-white shadow-lg"}>
                            <div className={"flex flex-row items-center p-3 w-full"}>
                                米塔集團是一家以科技創新為核心的多元化企業集團，總部位於台灣。該集團擁有多家子公司，從電腦主機板、筆電、平板、智慧穿戴裝置、到網路服務等領域均有涉足。集團注重研發與創新，擁有強大的技術實力和國際化的經營策略，並且不斷推出具有創新性的產品和服務。此外，集團也重視企業社會責任，積極參與公益活動，致力於推動社會的可持續發展。
                            </div>
                        </div>

                        <span className={"mt-4 font-bold"}>店家 VIP</span>
                        <div className={"flex flex-col gap-2 mb-2"}>
                            <div className={"flex flex-row rounded-lg items-center bg-indigo-500 p-3"}>
                                <div className={"flex flex-row justify-between items-center w-full"}>
                                    <div className={"text-white"}>網路會員</div>
                                    <div className={"bg-white p-1 rounded-xl font-bold"}>已持有</div>
                                </div>
                            </div>
                            <div className={"flex flex-row rounded-lg items-center bg-indigo-500 p-3"}>
                                <div className={"flex flex-row justify-between items-center w-full"}>
                                    <div className={"text-white"}>白金會員</div>
                                    <div className={""}><InformationCircleIcon className={"h-5 w-5 text-white"}/></div>
                                </div>
                            </div>
                            <div className={"flex flex-row rounded-lg items-center bg-indigo-500 p-3"}>
                                <div className={"flex flex-row justify-between items-center w-full"}>
                                    <div className={"text-white"}>黃金會員</div>
                                    <div className={""}><InformationCircleIcon className={"h-5 w-5 text-white"}/></div>
                                </div>
                            </div>
                            <div className={"flex flex-row rounded-lg items-center bg-indigo-500 p-3"}>
                                <div className={"flex flex-row justify-between items-center w-full"}>
                                    <div className={"text-white"}>鑽石會員</div>
                                    <div className={""}><InformationCircleIcon className={"h-5 w-5 text-white"}/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Page>
    )
}