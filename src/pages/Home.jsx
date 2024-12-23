import { useEffect, useState } from "react";
import { ArticleList } from "../components/ArticleList";
import { Banier } from "../components/Banier";
import { Page } from "../components/Page";
import { Partenaire } from "../components/Partenaire";
import endPoint from "../services/endPoint";
import request from "../services/request";

const Home = () => {
    const [actualites, setActualites] = useState([]);
    const [lang, setLang] = useState(localStorage.getItem("lang") || "FR");

    useEffect(() => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang && storedLang !== lang) {
            setLang(storedLang);
        }
    }, [lang]);

    useEffect(() => {
        getActualites();
    }, []);

    const getActualites = () => {
        request
            .get(endPoint.categories + "/actualites")
            .then((res) => {
                console.log(res.data.data);
                if (res.data.data.toutes_sous_categories.length < 4) {
                    res.data.data.toutes_sous_categories = [
                        ...res.data.data.toutes_sous_categories,
                        ...res.data.data.toutes_sous_categories,
                        ...res.data.data.toutes_sous_categories,
                        ...res.data.data.toutes_sous_categories,
                    ];
                }
                setActualites(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const evenements = () => {
        request
            .get(endPoint.categories + "/actualites")
            .then((res) => {
                console.log(res.data.data);
                setDetail(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Page>
            <Banier datas={actualites} />
            <ArticleList
                datas={actualites}
                type={"actualites" /*"evenements"*/}
            >

                {lang === "en" ? <>Upcoming <span className="fw-bold">events</span></> : <>Les <span className="fw-bold">évènements</span> à venir</>}
            </ArticleList>
            <Partenaire>
                {lang === "en" ? <>Our <span className="fw-bold">facts</span> and <span className="fw-bold">key figures</span></> : <>Nos <span className="fw-bold">faits</span> et{" "}
                    <span className="fw-bold">chiffres</span> clés</>}

            </Partenaire>
            <ArticleList datas={actualites} type="actualites">
                {lang === "en" ? <>Latest <span className="fw-bold">Publications</span></> : <>Dernières <span className="fw-bold">Publications</span></>}
            </ArticleList>
        </Page>
    );
};

export default Home;
