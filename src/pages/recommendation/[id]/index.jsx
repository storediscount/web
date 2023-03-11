import Head from "next/head";
import titleFormatter from "../../../helpers/titleFormatter";
import {Block, Navbar, Page, Link, BlockTitle, List, ListItem} from "konsta/react";
import Map from "../../../components/Map";
import styles from "../../../../styles/Home.module.css";
import data from "../../../assets/data.json";
import recommendation from "../../../assets/recommendation.json";
import {ChevronLeftIcon, HandThumbDownIcon, HandThumbUpIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import {getObjectByID} from "../../../helpers/utility";
import UserStoreInvoiceList from "../../../components/UserStoreInvoiceList";

const DEFAULT_CENTER = [24.7972217, 120.9966699]

export default function Recommend({reco: {id, stores, name, content}}) {
    const router = useRouter()
    return (
        <Page>
            <Head>
                <title>{titleFormatter("推薦行程：" + name)}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter(name)}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon
                        className={"h-4 w-4"}/>返回</Link>}/>
            <Block>
                <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={16}>
                    {({TileLayer, Marker, Popup}) => (
                        <>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                            {stores.map(sid => (
                                <Marker position={[getObjectByID(sid).lat, getObjectByID(sid).lng]}>
                                    <Popup>
                                        <Link
                                            onClick={() => openSheet(getObjectByID(sid).id)}>{getObjectByID(sid).name}</Link>
                                    </Popup>
                                </Marker>
                            ))}
                        </>
                    )}
                </Map>
            </Block>

            <p className={"mx-4 text-3xl font-bold"}>{name}</p>
            <div className={"mx-4"} dangerouslySetInnerHTML={{__html: content.replaceAll("\n", '<br/>')}}></div>

            <BlockTitle>文中推薦商家列表</BlockTitle>
            <List strongIos outlineIos>
                {stores.map(sid => (
                    <ListItem
                        link
                        href={`/store/${sid}`}
                        chevronMaterial={false}
                        title={getObjectByID(sid).name}
                        after="查看店家"
                        subtitle={getObjectByID(sid).subtitle}
                        text={getObjectByID(sid).description}
                        // text={"../images/store/" + getObjectByID(sid).img}
                        media={
                            <img
                                className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                                src={"../images/store/" + getObjectByID(sid).img}
                                width="90"
                                alt="demo"
                            />
                        }
                    />
                ))}
            </List>
            <div className={"fixed bottom-4 w-full flex items-center justify-center py-6 z-10"}>
                <div className={"bg-orange-400 p-4 rounded-lg flex gap-8 shadow-lg"}>
                    <div className={"flex flex-col"}>
                        <div className={"text-lg"}>限時商家85折卷</div>
                        <div className={"text-sm text-gray-600"}>*僅限於此3間店家使用</div>
                    </div>
                    <div className={"border border-white text-white p-2 rounded-2xl inline-flex items-center"}>立即領卷</div>
                </div>
            </div>
        </Page>
    )
}

export async function getStaticPaths() {
    return {
        paths: recommendation.map((reco) => ({
            params: {
                id: reco.id.toString(),
            }
        })),
        fallback: false
    };
}

export async function getStaticProps(context) {
    const {id} = context.params;
    let reco = recommendation.find((ele) => ele.id === id);
    if (typeof reco === "undefined") {
        return {
            notFound: true
        }
    }
    return {
        props: {
            reco
        }
    };
}