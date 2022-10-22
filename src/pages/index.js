import Head from 'next/head';

import Map from '../components/Map';

import styles from '../../styles/Home.module.css';
import {Block, Navbar, Page} from "konsta/react";
import {BlockTitle, Button, List, ListItem} from "konsta/react";
import {useRouter} from "next/router";
const DEFAULT_CENTER = [38.907132, -77.036546]

export default function Home() {
    const router = useRouter()
    return (
        <Page>
            <Head>
                <title></title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title="My App"/>
            <Block>
                <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={12}>
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
                        </>
                    )}
                </Map>
            </Block>

            <Block strong>
                <p>
                    Here is your Next.js & Konsta UI app. Let's see what we have here.
                </p>
            </Block>
            <BlockTitle>Navigation</BlockTitle>
            <List>
                <ListItem href="/about/" title="About" />
                <ListItem href="/form/" title="Form" />
            </List>

            <Block strong className="flex space-x-4">
                <Button onClick={()=>router.push('/wallet/detail')}>Button 1</Button>
                <Button>Button 2</Button>
            </Block>
        </Page>
    )
}
