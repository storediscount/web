import Head from "next/head";
import {useRouter} from "next/router";
import titleFormatter from "../../helpers/titleFormatter";
import {Card, Link, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {api} from "../../helpers/api";
import Swal from "sweetalert2";
import {useState} from "react";

import { RadioGroup } from '@headlessui/react'

const settings = [
    { name: '商家', description: '成為 Mapay 食支旅圖 的合作商家夥伴' },
    { name: '用戶', description: '成為用戶開始你的 Mapay 食支旅圖' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Register() {
    const router = useRouter()
    const [selected, setSelected] = useState(settings[0])
    const submitUserForm = () => {
        api.post('/auth/register', {
            email,
            password,
            name
        }).then((res) => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))

            Swal.fire({
                icon: 'success',
                title: '註冊',
                text: '註冊成功'
            }).then(() => {
                router.push('/me')
            })
        })
    }
    const submitSellerForm = () => {
        api.post('/auth/register_seller', {
            email,
            password,
            name,
            storeName
        }).then((res) => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))

            Swal.fire({
                icon: 'success',
                title: '註冊',
                text: '註冊成功'
            }).then(() => {
                router.push('/me')
            })
        })
    }
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [storeName, setStoreName] = useState('')
    return (
        <Page>
            <Head>
                <title>{titleFormatter("註冊")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter("註冊")}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon
                        className={"h-4 w-4"}/>返回</Link>}/>
            <div className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">註冊帳戶</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    已有帳號？{' '}
                    <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        立即登入
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-6">
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
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                姓名
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                註冊身份
                            </label>

                            <div className={"mt-1"}>
                                <RadioGroup value={selected} onChange={setSelected}>
                                    <RadioGroup.Label className="sr-only"> Privacy setting </RadioGroup.Label>
                                    <div className="-space-y-px rounded-md bg-white">
                                        {settings.map((setting, settingIdx) => (
                                            <RadioGroup.Option
                                                key={setting.name}
                                                value={setting}
                                                className={({checked}) =>
                                                    classNames(
                                                        settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                                        settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                                        checked ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200',
                                                        'relative border p-4 flex cursor-pointer focus:outline-none'
                                                    )
                                                }
                                            >
                                                {({active, checked}) => (
                                                    <>
                <span
                    className={classNames(
                        checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                        active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                        'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                    )}
                    aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5"/>
                </span>
                                                        <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                      as="span"
                      className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium')}
                  >
                    {setting.name}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                      as="span"
                      className={classNames(checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm')}
                  >
                    {setting.description}
                  </RadioGroup.Description>
                </span>
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>


                        <div className={selected.name !== '商家' && 'hidden'}>
                            <label htmlFor="store_name" className="block text-sm font-medium text-gray-700">
                                商家名稱
                            </label>
                            <div className="mt-1">
                                <input
                                    id="store_name"
                                    name="store_name"
                                    type="text"
                                    autoComplete="store_name"
                                    required
                                    onChange={(e) => setStoreName(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>


                        <div className={selected.name !== '用戶' && "hidden" }>
                            <button
                                onClick={submitUserForm}
                                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                立即註冊
                            </button>
                        </div>

                        <div className={selected.name !== '商家' && "hidden" }>
                            <button
                                onClick={submitSellerForm}
                                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                立即註冊
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}