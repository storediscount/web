import Head from "next/head";
import titleFormatter from "../../../helpers/titleFormatter";
import {Block, Navbar, Page, Link} from "konsta/react";
import Map from "../../../components/Map";
import styles from "../../../../styles/Home.module.css";
import data from "../../../assets/data.json";
import {ChevronLeftIcon, HandThumbDownIcon, HandThumbUpIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";

export default function Store({place}) {
    const router = useRouter()
    return (
        <Page>
            <Head>
                <title>{titleFormatter(place?.name)}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter(place?.name)}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon class={"h-4 w-4"}/>返回</Link>}/>
            <Block>
                <Map className={styles.homeMap} center={[place?.lat, place?.lng]} zoom={20}>
                    {({TileLayer, Marker, Popup}) => (
                        <>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                            <Marker position={[place?.lat, place?.lng]}>
                                <Popup>
                                    {place?.name}
                                </Popup>
                            </Marker>
                        </>
                    )}
                </Map>
            </Block>

            <Block strong>
                <p>
                    <strong>商家名稱:</strong> {place?.name}
                </p>
                <div className={"flex flex-row"}>
                    <HandThumbUpIcon className={"h-8 w-8"}/>
                    <HandThumbDownIcon className={"h-8 w-8"}/>
                </div>
                <p>
                    <strong>提供優惠:</strong> 沒有啦
                </p>
            </Block>
        </Page>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    "id": "1"
                }
            } // See the "paths" section below
        ],
        fallback: true
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