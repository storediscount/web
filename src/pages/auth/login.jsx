import Head from "next/head";
import {useRouter} from "next/router";
import titleFormatter from "../../helpers/titleFormatter";
import {Link, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {api} from "../../helpers/api";
import Swal from "sweetalert2";

export default function Login() {
    const router = useRouter()
    const submitForm = () => {
        api.post('/auth/login', {
            email,
            password
        }).then((res)=>{
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))

            Swal.fire({
                icon: 'success',
                title: '登入',
                text: '登入成功'
            }).then(()=>{
                router.push('/me')
            })
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: '錯誤',
                text: '登入失敗'
            }).then(()=>{
                setPassword('')
            })
        })
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Page>
            <Head>
                <title>{titleFormatter("登入")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter("登入")}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon
                        className={"h-4 w-4"}/>返回</Link>}/>
            <div className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
                <img
                    className="mx-auto h-24 w-auto"
                    src="/logo.png"
                    alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">登入帳戶</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    或{' '}
                    <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        註冊帳號
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-6" >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                電子郵件
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                密碼
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={submitForm}
                                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                登入
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}