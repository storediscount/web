import Head from "next/head";
import titleFormatter from "../../../helpers/titleFormatter";
import {Block, Navbar, Page, Link, BlockTitle, List, ListItem} from "konsta/react";
import Map from "../../../components/Map";
import styles from "../../../../styles/Home.module.css";
import data from "../../../assets/data.json";
import recommendation from "../../../assets/recommendation.json";
import {ChevronLeftIcon, HandThumbDownIcon, HandThumbUpIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import UserStoreInvoiceList from "../../../components/UserStoreInvoiceList";

const DEFAULT_CENTER = [24.7972217, 120.9966699]

function getStoreByID(id){
    console.log(id)
    return data.find(ele => ele.id === id)
}

export default function Recommend({reco: {id, name, stores}}) {
    const router = useRouter()
    console.log(stores);
    return (
        <Page>
            <Head>
                <title>{titleFormatter("推薦行程："+name)}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter(name)}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}/>
            <Block>
                <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={16}>
                    {({TileLayer, Marker, Popup, Polyline}) => (
                        <>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                            {stores.map(sid => (
                                    <Marker position={[getStoreByID(sid).lat, getStoreByID(sid).lng]}>
                                        <Popup>
                                            <Link onClick={() => openSheet(getStoreByID(sid).id)}>{getStoreByID(sid).name}</Link>
                                        </Popup>
                                    </Marker>
                            ))}
                        </>
                    )}
                </Map>
            </Block>

            <BlockTitle>推薦商家列表</BlockTitle>
            <List strongIos outlineIos>
                {stores.map(sid => (
                    <ListItem
                        link
                        href={`/store/${sid}`}
                        chevronMaterial={false}
                        title={getStoreByID(sid).name}
                        after={getStoreByID(sid).name}
                        subtitle={getStoreByID(sid).name}
                        text={"../images/store/" + getStoreByID(sid).img}
                        media={
                            <img
                                className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                                src={"../images/store/" + getStoreByID(sid).img}
                                width="90"
                                alt="demo"
                            />
                        }
                    />
                ))}
            </List>
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