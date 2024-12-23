import { Container } from "../components/Container";
import { Page } from "../components/Page";
import { FlecheIcon } from "../icons/FlecheIcon";
import { Filtre } from "../icons/Filtre";
import { EditIcon } from "../icons/EditIcon";
import { publication } from "../utils/TabMenu";
import { useEffect, useState } from "react";
import { MenuSection } from "../components/MenuSection";
import { useParams } from "react-router-dom";
import { Livre } from "./publication/Livre";
import request from "../services/request";
import endPoint from "../services/endPoint";
import { PublicationContent } from "./publication/PublicationContent";
import { MenuSectionTwo } from "../components/MenuSectionTwo";
import { SearchIcon } from "../icons/SearchIcon";

export const Publication = () => {
    const { slugOne, slugTwo } = useParams();
    const [data, setData] = useState({});
    const [detail, setDetail] = useState({});
    const [programmes, setProgrammes] = useState([]);
    const [year_filter, setYearFilter] = useState("");
    const [programme_filter, setProgrammeFilter] = useState("");
    const [search, setSearch] = useState("");

    const pages = {
        "theses": <PublicationContent year_filter={year_filter} programme_filter={programme_filter} search={search} />,
        "articles": <PublicationContent year_filter={year_filter} programme_filter={programme_filter} search={search} />,
        "livres": <PublicationContent year_filter={year_filter} programme_filter={programme_filter} search={search} />,
        "rapports-de-projets": <PublicationContent year_filter={year_filter} programme_filter={programme_filter} search={search} />,
        "rapports-annuels": <PublicationContent year_filter={year_filter} programme_filter={programme_filter} search={search} />,
        "plans-strategiques": <PublicationContent year_filter={year_filter} programme_filter={programme_filter} search={search} />,
        "newsletter": <PublicationContent year_filter={year_filter} programme_filter={programme_filter} search={search} />,


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
        getProgramme()
    }, []);

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 2010; year--) {
        years.push(year);
    }

    const get = () => {
        request
            .get(endPoint.categories + "/publications")
            .then((res) => {
                console.log(res.data.data);
                setDetail(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getProgramme = () => {
        request
            .get(endPoint.categories + "/programmes-de-recherche")
            .then((res) => {
                console.log(res.data.data);
                setProgrammes(res.data.data.toutes_sous_categories);
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
                        <h3 className="bg-primary text-white text-center1 ps-4 py-2 d-none d-md-block">
                            <EditIcon />
                            {lang === "en" ? detail.titre_en : detail.titre}

                        </h3>
                        <MenuSectionTwo
                            list={detail.toutes_sous_categories}
                            setData={setData}
                            link={"publications"}
                        />

                        <div className="bg-gray-e9  mt-4 p-4">
                            <div className="mb-3 fs-18 fw-bold">
                                {" "}
                                <Filtre /> Filtres
                            </div>
                            <select
                                className="form-select mb-3"
                                aria-label="Default select example"
                                onChange={(e) => setYearFilter(e.target.value)}
                            >
                                <option selected value={"all"}>
                                    {lang === "en" ? "Year of publication" : "Année de publication"}
                                </option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="form-select mb-3"
                                aria-label="Default select example"
                                onChange={(e) => setProgrammeFilter(e.target.value)}
                            >
                                <option selected value={"all"}>
                                    {lang === "en" ? "Research programs" : "Programmes de recherche"}
                                </option>
                                {
                                    programmes.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {lang === "en" ? item.titre_en : item.titre}
                                        </option>
                                    ))
                                }
                            </select>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control border-end-0 rounded-end-0"
                                    placeholder={lang === "en" ? "Search" : "Rechercher"}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <span
                                    className="input-group-text bg-white px-4"
                                    id="basic-addon2"
                                >
                                    <SearchIcon />
                                </span>
                            </div>
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
