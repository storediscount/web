import Head from "next/head";
import titleFormatter from "../../../helpers/titleFormatter";
import {Block, BlockTitle, List, ListItem, Navbar, Page} from "konsta/react";
import Map from "../../../components/Map";
import styles from "../../../../styles/Home.module.css";
import data from "../../../assets/data.json";

export default function Store({ place: {lat, lng, name} }) {
    return (
        <Page>
            <Head>
                <title>{titleFormatter(name)}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter(name)}/>
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
                                    test
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