import { Container } from "../components/Container";
import { Page } from "../components/Page";
import { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import { MenuSection } from "../components/MenuSection";
import request from "../services/request";
import endPoint from "../services/endPoint";
import { OneContent } from "./ipesti/OneContent";
import { MultiContent } from "./ipesti/MultiContent";
import { EquipeContent } from "./ipesti/EquipeContent";
import { GdnStidContent } from "./ipesti/GdnStidContent";

export const Ipesti = () => {
    const { slugOne } = useParams();
    const [data, setData] = useState({});
    const [detail,setDetail] = useState({})

    const pages = {
        presentation: <OneContent/>,
        "vision-missions": <OneContent/>,
        "objectifs": <OneContent/>,
        "structure-gouvernance": <MultiContent data={data} slug={"structure-gouvernance"} />,
        "partenaires-de-recherche": <MultiContent data={data} slug={"partenaires-de-recherche"} />,
        opportunites: <MultiContent data={data} slug={"opportunites"} />,
        "prix-distinctions": <OneContent/>,
        equipe: <EquipeContent data={data} slug={"equipe"} />,
        "point-focal-gdn": <GdnStidContent data={data} slug={"structure-gouvernance"} />,
        "reseau-stid": <GdnStidContent data={data} slug={"structure-gouvernance"} />,
    };
//partenaires-academiques-internationaux
    useEffect(() => {
        get()
    },[])

    const get = () => {
        request
            .get(endPoint.categories+"/ipesti")
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
                        <h3 className="bg-gray-60 text-white text-center py-2 d-none">
                            IPESTI
                        </h3>
                        <MenuSection
                            list={detail.toutes_sous_categories}
                            setData={setData}
                            link={"ipesti"}
                        />
                    </div>
                    {pages[slugOne]}
                </div>
            </Container>
        </Page>
    );
};
