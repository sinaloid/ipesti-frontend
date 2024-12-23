import { Container } from "../components/Container";
import { Page } from "../components/Page";
import { useEffect, useState } from "react";
import { MenuSection } from "../components/MenuSection";
import { useParams } from "react-router-dom";
import request from "../services/request";
import endPoint from "../services/endPoint";
import { ExpertiseContent } from "./expertise/ExpertiseContent";

export const Expertise = () => {
    const { slugOne, slugTwo } = useParams();
    const [data, setData] = useState({});
    const [detail, setDetail] = useState({});
    const [index, setIndex] = useState(0);
    const pages = {
        "centre-expertise-et-aide-a-la-decision": (<><ExpertiseContent /></>),
        "observatoire-enseignement-superieur": (<><ExpertiseContent /></>),
        "observatoire-science-et-technologie": (<><ExpertiseContent /></>),
        "observatoire-de-linnovation": (<><ExpertiseContent /></>),
        "observatoire-qualite-de-lenseignement-superieur": (<><ExpertiseContent /></>),
        "observatoire-de-la-transformation-numerique": (<><ExpertiseContent /></>),
    };
    //partenaires-academiques-internationaux

    const [lang, setLang] = useState(localStorage.getItem("lang") || "FR");

    useEffect(() => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang && storedLang !== lang) {
            setLang(storedLang);
        }
    }, [lang]);

    useEffect(() => {
        get();
    }, []);

    const get = () => {
        request
            .get(endPoint.categories + "/expertise-conseil")
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
            <Container>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <h3 className="bg-gray-60 text-white text-center1 ps-4 py-2 d-none d-md-block">
                            {lang === "en" ? detail.titre_en : detail.titre}    
                        </h3>
                        <MenuSection
                            list={detail.toutes_sous_categories}
                            setData={setData}
                            link={"expertise-conseil"}
                        />
                    </div>
                    <div className="col-12 col-md-8">
                        <h1 className="text-primary">{lang === "en" ? detail.titre_en : detail.titre}</h1>
                        <div className="my-4">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: lang === "en" ? detail.contenu_en : detail.contenu,
                                }}
                            />
                        </div>
                        <div className="">{pages[slugOne]}</div>
                    </div>
                </div>
            </Container>
        </Page>
    );
};
