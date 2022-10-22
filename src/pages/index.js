import Head from 'next/head';

import Map from '../components/Map';

import styles from '../../styles/Home.module.css';
import {Block, Link, Navbar, Page} from "konsta/react";
import {BlockTitle, List, ListItem} from "konsta/react";
import data from "../assets/data.json"
import titleFormatter from "../helpers/titleFormatter";
import {Sheet, Toolbar} from "konsta/react";
import {Button} from "konsta/react";
import {useRef, useState} from "react";
import {useRouter} from "next/router";
import {CurrencyDollarIcon, HomeIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import {HomeIcon as HomeSolidIcon} from "@heroicons/react/24/solid";
import {Popover} from "konsta/react";
import {PlusIcon} from "@heroicons/react/24/solid";

const DEFAULT_CENTER = [24.7972217, 120.9966699]

export default function Home() {
    const [sheetOpened, setSheetOpened] = useState(false);
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [currentSheetId, setCurrentSheetId] = useState("1");
    const popoverTargetRef = useRef()
    const router = useRouter()
    const openSheet = (id) => {
        setSheetOpened(true)
        setCurrentSheetId(id)
    }
    return (
        <Page>
            <Head>
                <title>{titleFormatter("")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title="Mapay ‧ 食支旅圖"/>
            <Block>
                <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={16}>
                    {({TileLayer, Marker, Popup, Polyline}) => (
                        <>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                            <Marker position={DEFAULT_CENTER}>
                                <Popup>
                                    test
                                </Popup>
                            </Marker>
                            <Polyline positions={data.map((item) => [item.lat, item.lng])}/>
                            {data.map((place) => (
                                <Marker position={[place.lat, place.lng]}>
                                    <Popup>
                                        <Link onClick={() => openSheet(place.id)}>{place.name}</Link>
                                    </Popup>
                                </Marker>
                            ))}
                        </>
                    )}
                </Map>
            </Block>

            <Block strong>
                <p>
                    測試
                </p>
            </Block>
            <BlockTitle>功能選單</BlockTitle>
            <List>
                <ListItem href="/wallet/detail" title="交易明細"/>
                <ListItem href="/wallet/pay" title="支付"/>
            </List>


            <Sheet
                className="pb-safe w-full"
                opened={sheetOpened}
                backdrop={true}
                onBackdropClick={() => setSheetOpened(false)}
            >
                <Toolbar top>
                    <div className="left"/>
                    <div className="right">
                        <Link toolbar onClick={() => setSheetOpened(false)}>
                            Done
                        </Link>
                    </div>
                </Toolbar>
                <Block>
                    <div className={"my-4"}>
                        商家名稱： {data.find((item) => item.id === currentSheetId)?.name}
                    </div>
                    <div className="mt-4">
                        <Button onClick={() => router.push(`/store/${currentSheetId}`)}
                                className={"w-full"}>查看更多</Button>
                    </div>
                </Block>
            </Sheet>


            <Toolbar
                top={false}
                className={`left-0 bottom-0 fixed w-full py-2 px-4`}
            >
                <Popover
                    opened={popoverOpened}
                    target={popoverTargetRef.current}
                    onBackdropClick={() => setPopoverOpened(false)}
                >
                    <List nested>
                        <ListItem
                            title="掃一掃"
                            link
                            onClick={() => setPopoverOpened(false)}
                        />
                        <ListItem
                            title="我的條碼"
                            link
                            onClick={() => setPopoverOpened(false)}
                        />
                    </List>
                </Popover>

                <Link toolbar className={"flex flex-col items-center justify-center"} href={"/"}>
                    {router.pathname === "/" ?
                        <HomeSolidIcon className={"w-12 h-12"}/> :
                        <HomeIcon className={"w-12 h-12"}/>
                    }

                    <div className={"text-sm"}>首頁</div>
                </Link>
                <Link toolbar className={"flex flex-col items-center justify-center"} ref={popoverTargetRef}>
                    <CurrencyDollarIcon className={"w-12 h-12"} onClick={() => setPopoverOpened(true)}/>
                    <div className={"text-sm"}>支付</div>
                </Link>
                <Link toolbar className={"flex flex-col items-center justify-center"}>
                    <UserCircleIcon className={"w-12 h-12"}/>
                    <div className={"text-sm"}>我的</div>
                </Link>
            </Toolbar>
        </Page>
    )
}
