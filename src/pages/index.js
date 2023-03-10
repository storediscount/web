import Head from 'next/head';

import Map from '../components/Map';

import styles from '../../styles/Home.module.css';
import {Block, Link, MenuList, MenuListItem, Navbar, Page} from "konsta/react";
import {BlockTitle, List, ListItem} from "konsta/react";
import data from "../assets/data.json"
import titleFormatter from "../helpers/titleFormatter";
import {Sheet, Toolbar} from "konsta/react";
import {Button} from "konsta/react";
import {useRef, useState} from "react";
import {useRouter} from "next/router";
import {
    ArchiveBoxIcon,
    CurrencyDollarIcon,
    HandThumbUpIcon,
    HomeIcon,
    UserCircleIcon
} from "@heroicons/react/24/outline";
import {Popover} from "konsta/react";
import {Tabbar, TabbarLink} from "konsta/react";
import {Icon} from "konsta/react";
import recommendations from "../assets/recommendation.json"
import {CreditCardIcon, EyeIcon, ShareIcon} from "@heroicons/react/20/solid";

const DEFAULT_CENTER = [24.7972217, 120.9966699]

export default function Home() {
    const [sheetOpened, setSheetOpened] = useState(false);
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [currentSheetId, setCurrentSheetId] = useState("1");

    const [isTabbarLabels, setIsTabbarLabels] = useState(true);
    const [isTabbarIcons, setIsTabbarIcons] = useState(false);

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
            <BlockTitle>推薦行程</BlockTitle>
            <Block>
                <List strong>
                    {recommendations.map(recommend => (
                        <ListItem
                            key={recommend.id}
                            link
                            innerChildren={
                                <div className={"flex flex-col w-full"}>
                                    <div className={"flex flex-row items-center"}>
                                        {Math.random() > 0.5 && <div
                                            className={"px-2 py-1 mr-3 my-1 bg-red-500 rounded text-white font-bold"}>HOT!!</div>}
                                        <EyeIcon className={"h-4 w-4"}/> {Math.floor(Math.random() * 15)}
                                    </div>
                                    <div className={"flex flex-row items-center gap-5 w-full"}>
                                        <div className={"inline-flex"}><HandThumbUpIcon className={"h-5 w-5"}/>按讚</div>
                                        <div className={"inline-flex"}><ArchiveBoxIcon className={"h-5 w-5"}/>留言</div>
                                        <div className={"inline-flex"}><ShareIcon className={"h-5 w-5"}/>分享</div>
                                    </div>
                                </div>
                            }
                            title={recommend.name}
                            onClick={() => router.push(`/recommendation/${recommend.id}`)}
                        />
                    ))}
                    <ListItem
                        link
                        className={"font-bold"}
                        title={'顯示更多...'}
                        onClick={() => router.push(`/recommendation`)}
                    />
                </List>
            </Block>
            <BlockTitle>功能選單</BlockTitle>
            <List>
                <ListItem href="/wallet/detail" title="交易明細"/>
                <ListItem href="/wallet/pay" title="支付"/>
                <ListItem href="/store" title="商店列表"/>
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
                            完成
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


            <div
                ref={popoverTargetRef}></div>
            <Tabbar
                labels={isTabbarLabels}
                icons={isTabbarIcons}
                className="left-0 bottom-0 fixed"
            >
                <TabbarLink tabbar
                            className={"flex flex-col items-center justify-center"}
                            onClick={() => router.push('/')}
                            icon={<Icon ios={<HomeIcon/>} className={"w-6 h-6"}/>}
                            active={router.pathname === "/"}
                            label={isTabbarLabels && "首頁"}
                ></TabbarLink>
                <TabbarLink tabbar
                            className={"flex flex-col items-center justify-center"}
                            onClick={() => setPopoverOpened(true)}
                            icon={<Icon ios={<CurrencyDollarIcon/>} className={"w-6 h-6"}/>}
                            active={router.pathname.startsWith("/wallet")}
                            label={isTabbarLabels && "支付"}
                ></TabbarLink>
                <TabbarLink tabbar
                            className={"flex flex-col items-center justify-center"}
                            onClick={() => router.push("/card")}
                            icon={<Icon ios={<CreditCardIcon/>} className={"w-6 h-6"}/>}
                            active={router.pathname === "/card"}
                            label={isTabbarLabels && "會員卡"}
                ></TabbarLink>
                <TabbarLink tabbar
                            className={"flex flex-col items-center justify-center"}
                            onClick={() => router.push("/me")}
                            icon={<Icon ios={<UserCircleIcon/>} className={"w-6 h-6"}/>}
                            active={router.pathname === "/me"}
                            label={isTabbarLabels && "我的"}
                ></TabbarLink>
                <Popover
                    opened={popoverOpened}
                    target={popoverTargetRef.current}
                    onBackdropClick={() => setPopoverOpened(false)}
                >
                    <List nested>
                        <ListItem
                            title="掃一掃"
                            link
                            href={'/wallet/pay'}
                            onClick={() => setPopoverOpened(false)}
                        />
                        <ListItem
                            title="我的條碼"
                            link
                            href={'/wallet/mycode'}
                            onClick={() => setPopoverOpened(false)}
                        />
                    </List>
                </Popover>

            </Tabbar>
        </Page>
    )
}
