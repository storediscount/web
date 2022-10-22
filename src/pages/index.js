import Head from 'next/head';

import Map from '../components/Map';

import styles from '../../styles/Home.module.css';
import {Block, Navbar, Page} from "konsta/react";
import {BlockTitle, List, ListItem} from "konsta/react";
import data from "../assets/data.json"

const DEFAULT_CENTER = [24.7972217, 120.9966699]

export default function Home() {
    return (
        <Page>
            <Head>
                <title></title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title="My App"/>
            <Block>
                <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={16}>
                    {({TileLayer, Marker, Popup}) => (
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
                                        {place.name}
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
        </Page>
    )
}
