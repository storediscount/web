import Head from "next/head";
import data from "../../assets/data.json"
import titleFormatter from "../../helpers/titleFormatter";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {BlockTitle, Link, List, ListItem, Navbar, Page} from "konsta/react";
import {useRouter} from "next/router";
import DetailRecord from "../../components/DetailRecord";
import transactionRecord from "../../assets/transaction_record_dummy_data.json"

export default function WalletDetail() {
    /*
    transactionRecord.map((record) => {
        console.log(record.id)
        console.log(record.items)
        console.log(record.total)
    })
    */
   const router = useRouter()
    return (
        <Page>
            <Head>
                <title>{titleFormatter("錢包明細")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar 
                title={titleFormatter("錢包明細")}
                left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}
            />

            <BlockTitle>錢包明細</BlockTitle>
            <List strongIos outlineIos>
                {transactionRecord.map((record) => (
                    <ListItem
                        key={record.id}
                        text={
                            <>
                                <Link className="text-xl" onClick={() => router.push(`/store/${record.storeId}`)}>
                                    {data.find((store) => store.id === record.storeId).name}
                                </Link>
                                <DetailRecord items={record.items} total={record.total} storeId={record.storeId} discount={record.discountValue}/>
                            </>
                        }
                    />
                ))}
            </List>
        </Page>
    )
}