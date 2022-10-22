import Head from "next/head";
import {useRouter} from "next/router";
import {Button, Card, Link, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import titleFormatter from "../helpers/titleFormatter";
import Swal from "sweetalert2";

export default function Me() {
    const router = useRouter()

    const [logined, setLogined] = useState(false)
    const [user, setUser] = useState({})
    const logout = () => {
        localStorage.removeItem('token')
        Swal.fire({
            'icon': 'success',
            'title': '完成',
            'text': '登出成功'
        }).then(()=>{
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
    }, [user, router, logined])

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
                    <div className={"flex flex-row justify-center items-center gap-4"}>
                        <Link href={"/auth/login"} className={`text-xl ${logined && 'hidden'}`}>登入 | 註冊</Link>

                        <p className={`text-xl ${!logined && 'hidden'}`}>Hi! {user?.name}</p>
                        <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path
                                  d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                            </svg>
                          </span>
                    </div>
                    <Button onClick={() => logout()} className={`mt-8 ${!logined && "hidden"}`}>登出</Button>
                </Card>
            </div>
        </Page>
    )
}