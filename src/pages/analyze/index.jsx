import Head from "next/head";
import titleFormatter from "../../helpers/titleFormatter";
import {Link, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import {PieChart} from 'react-minimal-pie-chart';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'

const stats = [
    { name: '所有顧客', stat: '1005', previousStat: '1059', change: '12%', changeType: 'increase' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function () {
    const router = useRouter()
    const data = [
        {title: '南部', value: 5, color: '#E38627'},
        {title: '中部', value: 15, color: '#C13C37'},
        {title: '北部', value: 25, color: '#6A2135'},
        {title: '東部', value: 2, color: '#88ebd2'},
    ]
    const data2 = [
        {title: '男性', value: 25, color: '#5544db'},
        {title: '女性', value: 30, color: '#f180ad'},
    ]
    const data3 = [
        {title: '10~20歲', value: 5, color: '#f8d9ae'},
        {title: '20~30歲', value: 20, color: '#88ebd2'},
        {title: '30~40歲', value: 25, color: '#5544db'},
        {title: '40歲以上', value: 7, color: '#f180ad'},
    ]
    return (
        <Page>
            <Head>
                <title>{titleFormatter("成就")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter("成就")}
                    left={<Link onClick={() => router.back()} navbar>
                        <ChevronLeftIcon
                            className={"h-4 w-4"}/>返回</Link>}/>

            <div className={"mx-2 my-3 p-5"}>
                <span className={"mt-4 font-bold"}>近日消費分析</span>
                <div>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">最近一週</h3>
                    <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
                        {stats.map((item) => (
                            <div key={item.name} className="px-4 py-5 sm:p-6">
                                <dt className="text-base font-normal text-gray-900">{item.name}</dt>
                                <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                                        {item.stat}
                                        <span className="ml-2 text-sm font-medium text-gray-500">自 {item.previousStat}</span>
                                    </div>

                                    <div
                                        className={classNames(
                                            item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                            'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                                        )}
                                    >
                                        {item.changeType === 'increase' ? (
                                            <ArrowUpIcon
                                                className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <ArrowDownIcon
                                                className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                                                aria-hidden="true"
                                            />
                                        )}

                                        <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                                        {item.change}
                                    </div>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <span className={"mt-4 font-bold"}>來客居住地分析</span>
                <PieChart
                    data={data}
                    segmentsShift={0.5}
                    label={({dataEntry}) => dataEntry.title + (dataEntry.value / data.reduce((a, b) => a + b.value, 0) * 100).toFixed(2) + '%'}
                    labelStyle={{
                        fontSize: '5px',
                        fontFamily: 'sans-serif'
                    }}
                    style={{height: '400px'}}
                />

                <span className={"mt-4 font-bold"}>來客性別分析</span>
                <PieChart
                    data={data2}
                    segmentsShift={0.5}
                    label={({dataEntry}) => dataEntry.title + (dataEntry.value / data2.reduce((a, b) => a + b.value, 0) * 100).toFixed(2) + '%'}
                    labelStyle={{
                        fontSize: '5px',
                        fontFamily: 'sans-serif'
                    }}
                    style={{height: '400px'}}
                />

                <span className={"mt-4 font-bold"}>來客年齡分析</span>
                <PieChart
                    data={data3}
                    segmentsShift={0.5}
                    label={({dataEntry}) => dataEntry.title + (dataEntry.value / data3.reduce((a, b) => a + b.value, 0) * 100).toFixed(2) + '%'}
                    labelStyle={{
                        fontSize: '5px',
                        fontFamily: 'sans-serif'
                    }}
                    style={{height: '400px'}}
                />
            </div>
        </Page>
    )
}