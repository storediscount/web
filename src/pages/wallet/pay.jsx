import Head from "next/head";
import {Block, BlockTitle, Button, Link, List, ListItem, Navbar, Page, Sheet, Toolbar, Checkbox} from "konsta/react";
import Html5QrcodePlugin from "../../components/QRCodeScanner";
import titleFormatter from "../../helpers/titleFormatter";
import {useState} from "react";
import stores from "../../assets/data.json";
import coupons from "../../assets/coupon_ticket.json"
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import customerLevel from "../../assets/customer_level.json";
import {Preloader} from "konsta/react";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";

export default function WalletDetail() {
    const [sheetOpened, setSheetOpened] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [order, setOrder] = useState([]);
    const [store, setStore] = useState(1);
    const [scanned, setScanned] = useState(false);
    const [checkedCoupon, setCheckedCoupon] = useState((new Array(coupons.length)).fill(false))
    const [notpaying, setNotPaying] = useState(true);
    const router = useRouter()
    const result = (res) => {
        const data = JSON.parse(res);
        switch (data.type) {
            case "payment":
                if (scanned) break
                setScanned(true);
                const {store, order} = data;
                if (order)
                    setOrder(order);
                if (store) {
                    setStore(store);
                    console.log("check" + store.toString())
                }
                const items = stores.find((place) => place.id === store).items;
                setTotalPrice(order.reduce((acc, cur) => acc + items.find(item => item.id === cur.id).price * cur.amount, 0));
                setFinalPrice(order.reduce((acc, cur) => acc + items.find(item => item.id === cur.id).price * cur.amount, 0));
                setSheetOpened(true);
                break
        }
    }
    const calcDiscount = (_checkedCoupon) => {
        // value first, percentage second
        let percentage = 1.0, value = 0
        for (let i = 0; i < coupons.length; i++) {
            if (_checkedCoupon[i]) {
                percentage *= parseFloat(coupons[i].discountPercentage)
                value += parseInt(coupons[i].discountValue)
            }
        }
        setFinalPrice(Math.floor(Math.max((totalPrice - value) * percentage), 0))
    }
    const handleCheckedCouponChange = (e, id) => {
        let _checkedCoupon = [...checkedCoupon]
        _checkedCoupon[id - 1] = e.target.checked
        setCheckedCoupon(_checkedCoupon)
        calcDiscount(_checkedCoupon)
    }
    const pay = () => {
        setNotPaying(false)
        setTimeout(()=>{
            setSheetOpened(false)
            Swal.fire({
                icon: "success",
                title: "支付狀態",
                text: "支付成功",
            })
        }, 2000)
        // build 2
    }
    return (
        <Page>
            <Head>
                <title>{titleFormatter("掃碼支付")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar
                title={titleFormatter("掃碼支付")}
                left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}
            />

            <BlockTitle>掃碼支付</BlockTitle>
            <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={result}/>

            <Sheet
                className="pb-safe w-full"
                opened={sheetOpened}
                onBackdropClick={() => setSheetOpened(false)}
            >
                <Toolbar top>
                    <div className="left"/>
                    <div className="right">
                        <Link toolbar onClick={() => setSheetOpened(false)}>
                            取消
                        </Link>
                    </div>
                </Toolbar>
                <Block>
                    <div className={"text-2xl -mt-4 border-b pb-1"}>
                        您確定要支付？
                    </div>
                    <div className={"flex flex-col mt-2"}>
                        {order.map((o) => {
                            return (
                                <div className={"flex flex-row justify-between"}>
                                    <div>{stores.find((place) => place.id.toString() === store.toString())?.items?.find(i => i.id.toString() === o.id.toString())?.name}</div>
                                    <div>{stores.find((place) => place.id.toString() === store.toString())?.items?.find(i => i.id.toString() === o.id.toString())?.price} x {o.amount}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={"flex flex-col gap-1 mt-2 border-y py-2"}>
                        {coupons.map((coupon) => (
                            <div className={"flex flex-row justify-between"} key={coupon.id}>
                                <div>{coupon.name}</div>
                                <Checkbox
                                    checked={checkedCoupon[parseInt(coupon.id) - 1]}
                                    onChange={(e) => handleCheckedCouponChange(e, parseInt(coupon.id))}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={"flex flex-col bg-gray-200 rounded-t px-2 py-2 text-center mt-4"}>
                        {"熟客優惠："
                            + stores.find(st => st.id.toString() === store.toString()).vip[customerLevel[0][store.toString()]].name
                            + "，"
                            + stores.find(st => st.id.toString() === store.toString()).vip[customerLevel[0][store.toString()]].description
                        }
                    </div>
                    <div className={"flex flex-col bg-gray-200 rounded-t px-2 py-2 text-center mt-4"}>
                        {"耶～ 本次 MaPay 幫您省下了 $"
                            + (totalPrice- Math.floor(finalPrice * stores.find(st => st.id.toString() === store.toString()).vip[customerLevel[0][store.toString()]].discount_ratio)).toString()
                        }
                    </div>
                    <div className="">
                        <Button onClick={pay}>支付
                            ${210 + Math.floor(finalPrice * stores.find(st => st.id.toString() === store.toString()).vip[customerLevel[0][store.toString()]].discount_ratio)}</Button>
                    </div>
                </Block>
            </Sheet>
            <div className={`absolute top-0 bottom-0 left-0 right-0 flex flex-col gap-2 justify-center items-center bg-gray-100 opacity-90 ${notpaying && 'hidden'}`}>
                <Preloader size="w-8 h-8" />
                <div>支付中，請勿關閉頁面避免支付失敗</div>
            </div>
        </Page>
    )
}      