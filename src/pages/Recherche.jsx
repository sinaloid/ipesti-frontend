import { Container } from "../components/Container";
import { Page } from "../components/Page";
import { useEffect, useState } from "react";
import { Equipe } from "./ipesti/Equipe";
import { useParams } from "react-router-dom";

import request from "../services/request";
import endPoint from "../services/endPoint";
import { MultiContent } from "./ipesti/MultiContent";
import { RechercheContent } from "./recherche/RechercheContent";
import { ProjetContent } from "./recherche/ProjetContent";
import { MenuSectionTwo } from "../components/MenuSectionTwo";


export const Recherche = () => {
    const { slugOne } = useParams();
    const [data, setData] = useState({});
    const [detail, setDetail] = useState({})

    const pages = {
        "programmes-de-recherche": <RechercheContent />,
        "projets-de-recherche": <RechercheContent />,
        "seminaires-de-recherche": <RechercheContent />,
        "tous-les-seminaires-de-lipesti": <ProjetContent />,
        "structure-gouvernance": <MultiContent data={data} slug={"structure-gouvernance"} />,
        "partenaires-de-recherche": <MultiContent data={data} slug={"partenaires-de-recherche"} />,
        opportunites: <MultiContent data={data} slug={"opportunites"} />,
        "prix-et-distinctions": <></>,
        equipes: <Equipe data={data} />,
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
        get()
    }, [])

    const get = () => {
        request
            .get(endPoint.categories + "/la-recherche")
            .then((res) => {
                console.log(res.data.data);
                setDetail(res.data.data)
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
                        <h3 className="bg-gray-60 text-white text-center py-2 d-none d-md-block">
                            {lang === "en" ? detail.titre_en : detail.titre}
                        </h3>
                        <MenuSectionTwo
                            list={detail.toutes_sous_categories}
                            setData={setData}
                            link={"la-recherche"}
                        />
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="my-41">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: detail?.contenu,
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
