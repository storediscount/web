import Head from "next/head";
import titleFormatter from "../../helpers/titleFormatter";
import {Link, Navbar, Page} from "konsta/react";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import {PieChart} from 'react-minimal-pie-chart';


export default function () {
    const router = useRouter()
    const data = [
        {title: '南部', value: 5, color: '#E38627'},
        {title: '中部', value: 15, color: '#C13C37'},
        {title: '北部', value: 25, color: '#6A2135'},
        {title: '東部', value: 2, color: '#88ebd2'},
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
            </div>
        </Page>
    )
}