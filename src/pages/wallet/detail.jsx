import Head from "next/head";
import data from "../../assets/data.json"
import {BlockTitle, Link, List, ListItem, Navbar, Page} from "konsta/react";
import titleFormatter from "../../helpers/titleFormatter";
import {useRouter} from "next/router";

const TransactionRecord = [
    {
        id: "1",
        storeId: "6",
        items: [
            {
                name: "豆花",
                number: 3,
                cost: 90
            },
            {
                name: "粉圓冰",
                number: 2,
                cost: 100
            }
        ],
        total: 190
    },
    {   
        id: "2",
        storeId: "4",
        items: [
            {
                name: "雞排",
                number: 1,
                cost: 60
            },
            {
                name: "台南大扁",
                number: 1,
                cost: 20
            }
        ],
        total: 80
    }
]

export default function WalletDetail() {
    /*
    TransactionRecord.map((record) => {
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
            <Navbar title={titleFormatter("錢包明細")}/>

            <BlockTitle>錢包明細</BlockTitle>
            <List strongIos outlineIos>
                {TransactionRecord.map((record) => (
                    <ListItem
                        key={record.id}
                        text={
                            <DetailRecord items={record.items} total={record.total} storeId={record.storeId} router={router}/>
                        }
                    />
                ))}
            </List>
        </Page>
    )
}

export function DetailRecord({items, total, storeId, router}) {
    return(
        <>
            <Link className="text-xl" onClick={() => router.push(`/store/${storeId}`)}>
                {data.find((store) => store.id === storeId).name}
            </Link>
            {items.map((item) => (
                <div key={item.name}>
                    <div className="float-left">
                        {item.name} x {item.number}
                    </div>
                    <div className="float-right">
                        {item.cost}
                    </div>
                </div>
            ))}
            <div className="text-xl">Total: {total}</div>
        </>
    )
}