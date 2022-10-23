import Head from "next/head";
import titleFormatter from "../../helpers/titleFormatter";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {BlockTitle, Card, Link, List, Navbar, Page} from "konsta/react";
import {useRouter} from "next/router";
import {Chip} from "konsta/react";
import recommendations from "../../assets/recommendation.json"
import {useState} from "react";
export default function RecommendationList() {
    const router = useRouter()
    const [filtered_recommendations, setFilteredRecommendations] = useState(recommendations)
    const [appliedTags, setAppliedTags] = useState([])
    function click(tag) {
        setAppliedTags([...appliedTags, tag])
        setFilteredRecommendations(recommendations.filter((recommendation) => recommendation.tags.some((tag) => appliedTags.includes(tag))))
    }
    return (
        <Page>
            <Head>
                <title>{titleFormatter("推薦行程檢索")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar
                title={titleFormatter("推薦行程檢索")}
                left={<Link onClick={() => router.back()} navbar><ChevronLeftIcon className={"h-4 w-4"}/>返回</Link>}
            />

            <BlockTitle>推薦行程檢索</BlockTitle>
            <List strongIos outlineIos>
                <div className={"bg-white px-4 my-4 border-b border-gray-200"}
                >
                    <div className={"flex flex-row flex-wrap py-4"}> {
                        recommendations.map((city)=>(
                            city.tags.map(tag=>(
                                <Chip outline className={`m-0.5 cursor-pointer ${appliedTags.includes(tag) && 'bg-gray-100'}`} onClick={()=>click(tag)}>
                                    {tag}
                                </Chip>
                            ))
                        ))
                    }
                    </div>
                </div>
            </List>

            <Card>
                <List strongIos outlineIos>
                    {filtered_recommendations.map((recommendation) => (
                        <div className={"bg-white px-4 my-4 border-b border-gray-200"} onClick={()=>router.push('/recommendation/' + recommendation.id)}>
                            <div>
                                <div className={"text-lg font-bold"}>{recommendation.name}</div>
                                <div className={"text-lg "}>景點數量： {recommendation.stores.length}</div>
                            </div>
                        </div>
                    ))}
                </List>
            </Card>
        </Page>
    )
}