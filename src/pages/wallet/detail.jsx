import Head from "next/head";
import {BlockTitle, List, ListItem, Navbar, Page} from "konsta/react";
import titleFormatter from "../../helpers/titleFormatter";

export default function WalletDetail() {
    return (
        <Page>
            <Head>
                <title>{titleFormatter("錢包明細")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter("錢包明細")}/>

            <BlockTitle>錢包明細</BlockTitle>
            <List strongIos outlineIos>
                <ListItem
                    link
                    chevronMaterial={false}
                    title="Facebook"
                    after="17:14"
                    subtitle="New messages from John Doe"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
                />
            </List>
        </Page>
    )
}