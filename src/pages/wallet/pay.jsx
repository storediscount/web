import Head from "next/head";
import {Block, BlockTitle, Button, Link, List, ListItem, Navbar, Page, Sheet, Toolbar, Checkbox} from "konsta/react";
import Html5QrcodePlugin from "../../components/QRCodeScanner";
import titleFormatter from "../../helpers/titleFormatter";
import {useState} from "react";
import stores from "../../assets/data.json";
import coupons from "../../assets/coupon_ticket.json"
import Swal from "sweetalert2";
import {useRouter} from "next/router";

export default function WalletDetail() {
    const [sheetOpened, setSheetOpened] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [order, setOrder] = useState([]);
    const [store, setStore] = useState(1);
    const [scanned, setScanned] = useState(false);
    const [checkedCoupon, setCheckedCoupon] = useState((new Array(coupons.length)).fill(false))
    const router = useRouter()
    const result = (res) => {
        const data = JSON.parse(res);
        switch (data.type) {
            case "payment":
                if (scanned) break
                setScanned(true);
                const {store, order} = data;
                console.log(store, order)
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
        for(let i=0;i<coupons.length;i++){
            if(_checkedCoupon[i]){
                percentage *= parseFloat(coupons[i].discountPercentage)
                value += parseInt(coupons[i].discountValue)
            }
        }
        setFinalPrice(Math.floor(Math.max((totalPrice-value)*percentage),0))
    }
    const handleCheckedCouponChange = (e, id) =>{
        let _checkedCoupon = [...checkedCoupon]
        _checkedCoupon[id-1] = e.target.checked
        setCheckedCoupon(_checkedCoupon)
        calcDiscount(_checkedCoupon)
    } 
    const pay = () => {
        setSheetOpened(false)
        Swal.fire({
            icon: "success",
            title: "支付狀態",
            text: "支付成功",
        }).then(() => {
            router.replace('/me')
        })
    }
    return (
        <Page>
            <Head>
                <title>{titleFormatter("掃碼支付")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter("掃碼支付")}/>

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
                            完成
                        </Link>
                    </div>
                </Toolbar>
                <Block>
                    <p>
                        您確定要支付？
                    </p>
                    <div className={"flex flex-col"}>
                        {order.map((o) => {
                            return (
                                <div className={"flex flex-row justify-between"}>
                                    <div>{stores.find((place) => place.id.toString() === store.toString()).items.find(i => i.id.toString() === o.id.toString()).name}</div>
                                    <div>{stores.find((place) => place.id.toString() === store.toString()).items.find(i => i.id.toString() === o.id.toString()).price} x {o.amount}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        {coupons.map((coupon) => (
                            <div className={"flex flex-row justify-between"} key={coupon.id}>
                                <div>{coupon.name}</div>
                                <Checkbox
                                    checked={checkedCoupon[parseInt(coupon.id)-1]}
                                    onChange={(e) => handleCheckedCouponChange(e,parseInt(coupon.id))}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <Button onClick={pay}>支付 ${finalPrice}</Button>
                    </div>
                </Block>
            </Sheet>
        </Page>
    )
}