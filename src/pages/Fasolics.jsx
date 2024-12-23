import { Container } from "../components/Container";
import { Page } from "../components/Page";
import { FlecheIcon } from "../icons/FlecheIcon";
import recherche from "../assets/images/recherche.png";
import { Filtre } from "../icons/Filtre";
import { DownIcon } from "../icons/DownIcon";
import { RightIcon } from "../icons/RightIcon";
import { MenuSection } from "../components/MenuSection";
import { useEffect, useState } from "react";
import { fasolics } from "../utils/TabMenu";
import request from "../services/request";
import endPoint from "../services/endPoint";
import { useParams } from "react-router-dom";
import { FasolicsContent } from "./fasolics/FasolicsContent";
import { MenuSectionTwo } from "../components/MenuSectionTwo";

export const Fasolics = () => {
    const { slugOne, slugTwo } = useParams();
    const [data, setData] = useState({});
    const [detail, setDetail] = useState({});
    const tab = [
        "Thématiques",
        "Gouvernance",
        "Impacts",
        "Projet RCR",
        "Organisations partenaires",
    ];
    const pages = {
        "a-propos": <FasolicsContent />,
        "nos-activites": <FasolicsContent />,
    };
    //partenaires-academiques-internationaux
    useEffect(() => {
        get();
    }, []);

    const get = () => {
        request
            .get(endPoint.categories + "/fasolics")
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
                    <div className="col-12 col-md-4 mt-2 mt-md-0">
                        <h3 className="bg-green text-white text-center py-2 text-uppercase">
                            FasoLics
                        </h3>
                        <div className="d-none d-md-block">
                            <MenuSection
                                list={detail.toutes_sous_categories}
                                setData={setData}
                                link={"fasolics"}
                            />
                        </div>
                        <div className="d-md-none">
                            <MenuSectionTwo
                                list={detail.toutes_sous_categories}
                                setData={setData}
                                link={"fasolics"}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        {pages[slugOne]}
                    </div>
                </div>
            </Container>
        </Page>
    );
};
