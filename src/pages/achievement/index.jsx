import Head from "next/head";
import titleFormatter from "../../helpers/titleFormatter";
import {Navbar, Page, Link, BlockTitle, Block, Card} from "konsta/react";
import achievements from "../../assets/achievements.json";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";


export default function AchievementPage() {
    const router = useRouter()
    return (
        <Page>
            <Head>
                <title>{titleFormatter("成就")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar title={titleFormatter("成就")}
                    left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}/>
            <BlockTitle>成就列表</BlockTitle>
            <Block>
                {achievements.map((achievement) => (
                    <Card key={achievement.id} >
                        <div className="ios:float-left ios:w-7/12">
                            <p className="mb-8 text-xl font-bold">{achievement.title}</p>
                            <p>
                                獲得條件:
                                <div>{achievement.description}</div>
                            </p>
                        </div>
                        <img src={achievement.picture} className="ios:rounded-lg ios:w-5/12 ios:mb-3 ios:float-right"/>
                    </Card>
                ))}
            </Block>
        </Page>
    )
}