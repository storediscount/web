import Head from "next/head";
import {useRouter} from "next/router";
import {Link, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon, TrashIcon} from "@heroicons/react/24/outline";
import {Fragment, useEffect,} from "react";
import titleFormatter from "../../helpers/titleFormatter";
import {useState} from 'react'
import {RadioGroup} from '@headlessui/react'
import {PlusIcon} from '@heroicons/react/20/solid'

import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {Menu, Transition} from '@headlessui/react'
import {api} from "../../helpers/api";
import Swal from "sweetalert2";

const settings = [
    {name: 'Public access', description: 'This project would be available to anyone who has the link'},
    {name: 'Private to Project Members', description: 'Only members of this project would be able to access'},
    {name: 'Private to you', description: 'You are the only one able to access this project'},
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Index() {
    const router = useRouter()

    const [selected, setSelected] = useState(settings[0])
    const [logined, setLogined] = useState(false)
    const [user, setUser] = useState({})
    const [stores, setStores] = useState([])
    const [admins, setAdmins] = useState([])
    const [currentStore, setCurrentStore] = useState(-1)
    const [storeName, setStoreName] = useState('')
    const [description, setDescription] = useState('')
    const [currentStoreVerified, setCurrentStoreVerified] = useState(false)

    useEffect(() => {
        //const token = localStorage?.getItem('token')
        //const user = localStorage?.getItem('user')
        if (token) {
            setLogined(true)
            setUser(JSON.parse(user))
            api('/me/stores').then(r => {
                if (r.data.length === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '找不到商店',
                    }).then(() => {
                        router.replace('/')
                    })
                }
                setStores(r.data)
                setCurrentStore(r.data[0].id)
            })
        }
    }, [router])

    useEffect(() => {
        if (currentStore !== -1) {
            const store = stores.find(s => s.id === currentStore)
            setStoreName(store.name)
            setDescription(store.description)
            setAdmins(store.admins)
            setCurrentStoreVerified(store.verified_at)
        }
    }, [currentStore])

    const setStore = (id) => {
        setCurrentStore(id)
        Swal.fire({
            icon: 'success',
            title: '切換成功',
        })
    }

    const updateStore = () => {
        api.put(`/stores/${currentStore}`, {
            name: storeName,
            description: description,
        }).then(r => {
            Swal.fire({
                icon: 'success',
                title: '更新成功',
            }).then(()=>router.reload())
        })
    }

    return (
        <Page>
            <Head>
                <title>{titleFormatter("商家管理")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter("商家管理")}
                    left={<Link onClick={() => router.back()} navbar>
                        <ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}/>
            <div className={"mt-8"}>

                <main className="mx-auto max-w-lg px-4 pt-10 pb-12 lg:pb-16">
                    <div>
                        <div className="space-y-6">
                            <Menu as="div" className="relative inline-block text-left flex justify-end">
                                <div>
                                    <Menu.Button
                                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                        選擇商家
                                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true"/>
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {stores.map((store) => (

                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            onClick={() => setStore(store.id)}
                                                            className={classNames(
                                                                active || currentStore === store.id ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {store.name}（ID: {store.id}, {store.verified_at ? '已認證' : '未認證'}）
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            <div className={"flex justify-between items-center"}>

                                <div>
                                    <h1 className="text-lg font-medium leading-6 text-gray-900">商家設定</h1>
                                    <p className="mt-1 text-sm text-gray-500">
                                        設定商家資訊
                                    </p>
                                </div>

                                <div className={`px-2 py-1 rounded-lg ${currentStoreVerified ? 'bg-green-200' : 'bg-red-200'}`}>{currentStoreVerified ? '已認證' : '未認證'}</div>
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    商家名稱
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                        defaultValue="無命名商店"
                                        value={storeName}
                                        onChange={(e) => setStoreName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    商店介紹
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                        defaultValue={''}
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="space-y-1">
                                    <label htmlFor="add-team-members"
                                           className="block text-sm font-medium text-gray-700">
                                        新增成員
                                    </label>
                                    <p id="add-team-members-helper" className="sr-only">
                                        Search by email address
                                    </p>
                                    <div className="flex">
                                        <div className="flex-grow">
                                            <input
                                                type="text"
                                                name="add-team-members"
                                                id="add-team-members"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                                placeholder="Email address"
                                                aria-describedby="add-team-members-helper"
                                            />
                                        </div>
                                        <span className="ml-3">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                            >
                                              <PlusIcon className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                                                        aria-hidden="true"/>
                                              <span>新增</span>
                                            </button>
                                          </span>
                                    </div>
                                </div>

                                <div className="border-b border-gray-200">
                                    <ul role="list" className="divide-y divide-gray-200">
                                        {admins.map((person) => (
                                            <li key={person.email} className="flex py-4 items-center justify-between">
                                                <div className={'flex items-center'}>
                                                <span
                                                    className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-500">
                                                    <span
                                                        className="text-lg font-medium leading-none text-white">{person.name}</span>
                                                  </span>
                                                    <div className="ml-3 flex flex-col">
                                                    <span
                                                        className="text-sm font-medium text-gray-900">{person.name}</span>
                                                        <span className="text-sm text-gray-500">{person.email}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <TrashIcon
                                                        className="h-6 w-6 cursor-pointer text-red-400 hover:text-red-500"/>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={()=>updateStore()}
                                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                >
                                    儲存
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Page>
    )
}
