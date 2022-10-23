import Head from "next/head";
import {useRouter} from "next/router";
import {Block, Button, Card, Link, List, ListItem, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import titleFormatter from "../helpers/titleFormatter";
import Swal from "sweetalert2";
import {Badge} from "konsta/react";
import {
    BanknotesIcon,
    BookmarkIcon,
    CheckBadgeIcon,
    CurrencyDollarIcon,
    DocumentIcon,
    PaperClipIcon
} from "@heroicons/react/24/solid";

export default function Me() {
    const router = useRouter() // fuck2

    const [logined, setLogined] = useState(false)
    const [user, setUser] = useState({})
    const logout = () => {
        localStorage.removeItem('token')
        Swal.fire({
            'icon': 'success',
            'title': '完成',
            'text': '登出成功'
        }).then(() => {
            router.replace('/')
        })
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        if (token) {
            setLogined(true)
            setUser(JSON.parse(user))
        }
    }, [router, logined])

    return (
        <Page>
            <Head>
                <title>{titleFormatter("我的")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter("我的")}
                    left={<Link onClick={() => router.back()} navbar>
                        <ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}/>
            <div className={"mt-8"}>
                <Card>
                    <div className={"flex flex-col"}>
                        <Link href={"/"}><img src={'/logo.png'} alt={'logo'}/></Link>
                        <div className={`flex flex-col gap-2 w-full ${logined && 'hidden'}`}>
                            <Button onClick={() => router.push("/auth/login")}>登入</Button>
                            <Button onClick={() => router.push("/auth/register")}>註冊</Button>
                        </div>
                        <div className={"flex flex-row w-full justify-start items-center gap-2"}>

                            <span
                                onClick={() => router.push("/order/4")}
                                className={`inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 ${!logined && 'hidden'}`}>
                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                                    </svg>
                                </span>
                            <div>
                                <p className={`text-xl ${!logined && 'hidden'}`}>{user?.name}</p>
                                <p className={`text-sm text-gray-400 ${!logined && 'hidden'}`}>{user?.email}</p>
                            </div>
                        </div>

                        <div className={`${!logined && "hidden"}`}>
                            <List>
                                <ListItem
                                    className={"bg-gray-200"}
                                    href={"/wallet/balance"}
                                    title={"餘額"}
                                    media={<CurrencyDollarIcon className={"h-6 w-6"}/>}
                                    link
                                    after={"743"}
                                ></ListItem>
                                <ListItem
                                    className={"bg-gray-200"}
                                    href={"/achievement"}
                                    title={"成就與徽章"}
                                    media={<CheckBadgeIcon className={"h-6 w-6"}/>}
                                    link
                                ></ListItem>
                                <ListItem
                                    className={"bg-gray-200"}
                                    href={"/wallet/detail"}
                                    title={"交易紀錄"}
                                    media={<DocumentIcon className={"h-6 w-6"}/>}
                                    link
                                ></ListItem>
                                <ListItem
                                    className={"bg-gray-200"}
                                    href={"/store/favorite"}
                                    title={"收藏商家"}
                                    media={<BookmarkIcon className={"h-6 w-6"}/>}
                                    link
                                ></ListItem>
                                <ListItem
                                    className={"bg-gray-200"}
                                    href={"/wallet/coupon"}
                                    title={"我的優惠券"}
                                    media={<BanknotesIcon className={"h-6 w-6"}/>}
                                    link
                                ></ListItem>
                            </List>
                            <Button onClick={() => router.push('/seller')}
                                    className={`mt-8 ${user.type !== "商家" && "hidden"}`}>商家管理頁面</Button>
                            <Button onClick={() => logout()} className={`mt-8 `}>登出</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    )
}