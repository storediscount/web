import Head from "next/head";
import titleFormatter from "../../helpers/titleFormatter";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {BlockTitle, Link, List, ListItem, Navbar, Page} from "konsta/react";
import {useRouter} from "next/router";
import coupons from "../../assets/coupon_ticket.json"

export default function CouponList() {
    const router = useRouter()
    return (
        <Page>
            <Head>
                <title>{titleFormatter("優惠券")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar
                title={titleFormatter("優惠券")}
                left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}
            />

            <BlockTitle>優惠券</BlockTitle>
            <List strongIos outlineIos>
                {coupons.map((ticket) => (
                    <div className={"bg-white px-4 py-2 border-b border-gray-200"}
                         key={ticket.id}
                    >
                        <div>
                            <div className={"text-lg font-bold"}>{ticket.name}</div>
                            {ticket.description}
                        </div>
                    </div>
                ))}
            </List>
        </Page>
    )
}