import { Container } from "../components/Container";
import { Page } from "../components/Page";
import { FlecheIcon } from "../icons/FlecheIcon";
import rech from "../assets/images/recherche.png";
import { Filtre } from "../icons/Filtre";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recherche } from "../utils/TabMenu";
import { MenuSection } from "../components/MenuSection";
export const Recherche = () => {
    const tab = [
        "Projets de recherche",
        "Séminaires de recherches",
        "Tous les séminaires de l’IPESTI",
    ];
    const { slugOne, slugTwo } = useParams();
    const [data, setData] = useState({});
    const pages = {
        histoire: <></>,
    };
    const [label, setLabel] = useState()
    useEffect(() => {
        getLabel()
    },[slugOne])

    const getLabel = () => {
        recherche.map((data) => {
            if(data.slug === slugOne){
                setLabel(data.label)
            }
        })
    }
    return (
        <Page>
            <Container>
                <div className="row my-5">
                    <div className="col-12 col-md-4">
                        <h3 className="bg-gray-60 text-white text-center py-2">
                            La recherche
                        </h3>
                        <div className="bg-gray-e9 p-4">
                            <div className="d-inline-block bg-gray-25 mb-3">
                                <MenuSection
                                    list={recherche}
                                    setData={setData}
                                    link={"recherche"}
                                />
                            </div>
                        </div>

                        <div className="bg-gray-e9  mt-4 p-4">
                            <div className="mb-3 fs-18 fw-bold">
                                {" "}
                                <Filtre /> Filtres
                            </div>
                            <select
                                class="form-select mb-3"
                                aria-label="Default select example"
                            >
                                <option selected>Année de publication</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <select
                                class="form-select mb-3"
                                aria-label="Default select example"
                            >
                                <option selected>Auteur</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <select
                                class="form-select mb-3"
                                aria-label="Default select example"
                            >
                                <option selected>
                                    Programmes de recherche
                                </option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <select
                                class="form-select mb-3"
                                aria-label="Default select example"
                            >
                                <option selected>Statut</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <h1 className="text-primary">
                            {
                                label
                            }
                        </h1>
                        <div className="my-4">
                            De la dizaine de centres de recherche sur les STIES
                            sur le continent, aucune ne se trouve en Afrique
                            francophone. Pourtant, comme le souligne l’Union
                            Africaine, «Les indicateurs de la science, de la
                            technologie et de l'innovation sont essentiels pour
                            suivre le développement scientifique et
                            technologique de l'Afrique. Ils sont utiles pour
                            formuler, ajuster et mettre en œuvre les politiques
                            de STI. De la dizaine de centres de recherche sur
                            les STIES sur le continent, aucune ne se trouve en
                            Afrique francophone. Pourtant, comme le souligne
                            l’Union Africaine, «Les indicateurs de la science,
                            de la technologie et de l'innovation sont essentiels
                            pour suivre le développement scientifique et
                            technologique de l'Afrique. Ils sont utiles pour
                            formuler, ajuster et mettre en œuvre les politiques
                            de STI.
                        </div>
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {[...Array(6).keys()].map((data, idx) => {
                                return (
                                    <div className="col ">
                                        <div className="position-relative">
                                            <img
                                                width={"100%"}
                                                src={rech}
                                                alt=""
                                            />
                                            <div
                                                className="position-absolute text-white text-center px-2"
                                                style={{
                                                    bottom: "12px",
                                                    left: "0",
                                                }}
                                            >
                                                <span>
                                                    Innovation et énergie
                                                    renouvelable au Burkina Faso
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <div className="btn border">
                                Voir tous les projets
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Page>
    );
};
