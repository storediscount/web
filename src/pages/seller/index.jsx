import Head from "next/head";
import {useRouter} from "next/router";
import {Link, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {Fragment, useEffect,} from "react";
import titleFormatter from "../../helpers/titleFormatter";
import {useState} from 'react'
import {RadioGroup} from '@headlessui/react'
import {PlusIcon} from '@heroicons/react/20/solid'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
const team = [
    {
        name: 'Calvin Hawkins',
        email: 'calvin.hawkins@example.com',
        imageUrl:
            'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Bessie Richards',
        email: 'bessie.richards@example.com',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Floyd Black',
        email: 'floyd.black@example.com',
        imageUrl:
            'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]
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

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        if (token) {
            setLogined(true)
            setUser(JSON.parse(user))
        }
    }, [router])

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

                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                            Options
                            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Account settings
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Support
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            License
                                        </a>
                                    )}
                                </Menu.Item>
                                <form method="POST" action="#">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                type="submit"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block w-full px-4 py-2 text-left text-sm'
                                                )}
                                            >
                                                Sign out
                                            </button>
                                        )}
                                    </Menu.Item>
                                </form>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
                <main className="mx-auto max-w-lg px-4 pt-10 pb-12 lg:pb-16">
                    <form>
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-lg font-medium leading-6 text-gray-900">Project Settings</h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Let’s get started by filling in the information below to create your new project.
                                </p>
                            </div>

                            <div>
                                <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
                                    Project Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="project-name"
                                        id="project-name"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                        defaultValue="Project Nero"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <div className="mt-1">
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    defaultValue={''}
                />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="space-y-1">
                                    <label htmlFor="add-team-members"
                                           className="block text-sm font-medium text-gray-700">
                                        Add Team Members
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
                      <PlusIcon className="-ml-2 mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
                      <span>Add</span>
                    </button>
                  </span>
                                    </div>
                                </div>

                                <div className="border-b border-gray-200">
                                    <ul role="list" className="divide-y divide-gray-200">
                                        {team.map((person) => (
                                            <li key={person.email} className="flex py-4">
                                                <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt=""/>
                                                <div className="ml-3 flex flex-col">
                                                    <span
                                                        className="text-sm font-medium text-gray-900">{person.name}</span>
                                                    <span className="text-sm text-gray-500">{person.email}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <RadioGroup value={selected} onChange={setSelected}>
                                <RadioGroup.Label
                                    className="text-sm font-medium text-gray-900">Privacy</RadioGroup.Label>

                                <div className="isolate mt-1 -space-y-px rounded-md bg-white shadow-sm">
                                    {settings.map((setting, settingIdx) => (
                                        <RadioGroup.Option
                                            key={setting.name}
                                            value={setting}
                                            className={({checked}) =>
                                                classNames(
                                                    settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                                    settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                                    checked ? 'bg-sky-50 border-sky-200 z-10' : 'border-gray-200',
                                                    'relative border p-4 flex cursor-pointer focus:outline-none'
                                                )
                                            }
                                        >
                                            {({active, checked}) => (
                                                <>
                        <span
                            className={classNames(
                                checked ? 'bg-sky-600 border-transparent' : 'bg-white border-gray-300',
                                active ? 'ring-2 ring-offset-2 ring-sky-500' : '',
                                'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                            )}
                            aria-hidden="true"
                        >
                          <span className="rounded-full bg-white w-1.5 h-1.5"/>
                        </span>
                                                    <span className="ml-3 flex flex-col">
                          <RadioGroup.Label
                              as="span"
                              className={classNames(
                                  checked ? 'text-sky-900' : 'text-gray-900',
                                  'block text-sm font-medium'
                              )}
                          >
                            {setting.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                              as="span"
                              className={classNames(checked ? 'text-sky-700' : 'text-gray-500', 'block text-sm')}
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

                            <div>
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                >
                                    Create this project
                                </button>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </Page>
    )
}
