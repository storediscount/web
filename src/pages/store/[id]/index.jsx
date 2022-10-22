import Head from "next/head";
import titleFormatter from "../../../helpers/titleFormatter";
import {Block, Navbar, Page, Link} from "konsta/react";
import Map from "../../../components/Map";
import styles from "../../../../styles/Home.module.css";
import data from "../../../assets/data.json";
import {ChevronLeftIcon, HandThumbDownIcon, HandThumbUpIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";

export default function Store({ place: {lat, lng, name} }) {
    const router = useRouter()
    return (
        <Page>
            <Head>
                <title>{titleFormatter(name)}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter(name)} left={<Link onClick={()=>router.back()} navbar><ChevronLeftIcon class={"h-4 w-4"}/>返回</Link>}/>
            <Block>
                <Map className={styles.homeMap} center={[lat, lng]} zoom={20}>
                    {({TileLayer, Marker, Popup}) => (
                        <>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                            <Marker position={[lat, lng]}>
                                <Popup>
                                    {name}
                                </Popup>
                            </Marker>
                        </>
                    )}
                </Map>
            </Block>

            <Block strong>
                <p>
                    <strong>商家名稱:</strong> {name}
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
    const { id } = context.params;
    const place = data.find((place) => place.id === id);
    if(!place) {
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