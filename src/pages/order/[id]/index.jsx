import Head from "next/head";
import titleFormatter from "../../../helpers/titleFormatter";
import {Block, Navbar, Page, Link, BlockTitle, List, ListItem, Button} from "konsta/react";
import Map from "../../../components/Map";
import styles from "../../../../styles/Home.module.css";
import data from "../../../assets/data.json";
import {ChevronLeftIcon, HandThumbDownIcon, HandThumbUpIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import UserStoreInvoiceList from "../../../components/UserStoreInvoiceList";
import {useState} from "react";
import {Popup} from "konsta/react";
import {Stepper} from "konsta/react";


export default function Order({place: {id, name, img, items}}) {
    const router = useRouter()
    const [cartPopUp, setCartPopUp] = useState(false);
    const [modifyAmountPopUp, setModifyAmountPopUp] = useState(false);
    const [nowModifyingItem, setNowModifyingItem] = useState(0);
    const [nowItemAmount, setNowItemAmount] = useState(0);
    const [order, setOrder] = useState({
        storeID: 0,
        item: [
            {
                id: 1,
                amount: 0
            },
            {
                id: 2,
                amount: 0
            }
        ]
    });

    function increaseItem(itemID){
        let newOrder = order;
        let item_to_mod = newOrder.item.findIndex((it) => it.id === itemID)
        newOrder.item[item_to_mod].amount += 1;
        setOrder(newOrder)
    }
    function decreaseItem(itemID){
        let newOrder = order;
        let item_to_mod = newOrder.item.findIndex((it) => it.id === itemID)
        newOrder.item[item_to_mod].amount -= 1;
        setOrder(newOrder)
    }
    function getItemAmount(itemID){
        let newOrder = order;
        let item_to_mod = newOrder.item.findIndex((it) => it.id === itemID)
        return newOrder.item[item_to_mod].amount;
    }


    function getItemInOrder(id){
        return order.item.findIndex(it => it.id === id)
    }

    return (
        <Page>
            <Head>
                <title>{titleFormatter(name)}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter(name)}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}/>


            <BlockTitle>商品列表</BlockTitle>
            <List strongIos outlineIos>
                {items.map(item => (
                    <ListItem
                        onClick={() => {
                            setNowModifyingItem(item.id)
                            setNowItemAmount(getItemAmount(item.id))
                            setModifyAmountPopUp(true)
                        }}
                        link
                        // href={`/store/${sid}`}
                        chevronMaterial={false}
                        title={item.name}
                        //after={item.name}
                        //subtitle={item.description}
                        text={item.description}
                        //text={"../images/store/" + getStoreByID(sid).img}
                        media={
                            <img
                                className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                                src={"../images/items/" + item.img}
                                width="90"
                                alt="demo"
                            />
                        }
                    />
                ))}
            </List>

            <Button onClick={() => setCartPopUp(true)}>檢視您的購物車</Button>
            <Button onClick={() => {
                localStorage.setItem('order', JSON.stringify(order))
            }}>送出訂單</Button>

            <Popup opened={cartPopUp} onBackdropClick={() => setCartPopUp(false)}>
                <Page>
                    <Navbar
                        title="檢視您的購物車"
                        right={
                            <Link navbar onClick={() => setCartPopUp(false)}>
                                Close
                            </Link>
                        }
                    />
                    <Block className="space-y-4">
                        {
                            order.item.map(item_to_show => <p>{items.find(i => i.id === item_to_show.id).name}*{item_to_show.amount}</p>)
                        }
                    </Block>
                </Page>
            </Popup>

            <Popup opened={modifyAmountPopUp} onBackdropClick={() => setModifyAmountPopUp(false)}>
                <Page>
                    <Navbar
                        title="新購買項目"
                        right={
                            <Link navbar onClick={() => setCartPopUp(false)}>

                            </Link>
                        }
                    />
                    <Block className="space-y-4">
                        <Stepper
                            value={nowItemAmount}
                            large
                            rounded
                            outline
                            onPlus={() => {
                                setNowItemAmount(nowItemAmount+1)
                                increaseItem(nowModifyingItem)
                            }}
                            onMinus={() => {
                                setNowItemAmount(nowItemAmount-1)
                                decreaseItem(nowModifyingItem)
                            }}
                        />
                    </Block>
                </Page>
            </Popup>
        </Page>
    )
}

export async function getStaticPaths() {
    return {
        paths: data.map((place) => ({
            params: {
                id: place.id.toString(),
            }
        })),
        fallback: false
    };
}

export async function getStaticProps(context) {
    const {id} = context.params;
    let place = data.find((place) => place.id === id);
    if (typeof place === "undefined") {
        return {
            notFound: true
        }
    }
    return {
        props: {
            place
        }
    };
}