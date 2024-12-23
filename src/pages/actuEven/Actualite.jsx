import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import request, { URL } from "../../services/request";
import endPoint from "../../services/endPoint";
import rech from "../../assets/images/recherche.png";
import { Calendar } from "../../icons/Calendar";

export const Actualite = ({ year_filter, programme_filter, search = "" }) => {
    const { slugOne, slugTwo } = useParams();
    const [data, setData] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate()

    const [lang, setLang] = useState(localStorage.getItem("lang") || "FR");

    useEffect(() => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang && storedLang !== lang) {
            setLang(storedLang);
        }
    }, [lang]);

    useEffect(() => {
        filterContent();
    }, [data, year_filter, programme_filter, search]);

    useEffect(() => {
        if (slugTwo) {
            getDetail();
        } else {
            get();
        }
    }, [slugOne, slugTwo]);

    const get = () => {
        request
            .get(endPoint.categories + "/" + slugOne)
            .then((res) => {
                console.log(res.data);
                setData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getDetail = () => {
        request
            .get(endPoint.categories + "/" + slugTwo)
            .then((res) => {
                console.log(res.data);
                setData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const detail = (e, slug) => {
        e.preventDefault()
        navigate(slug)
    }

    const filterContent = () => {
        let filtered = data.toutes_sous_categories || [];

        if (year_filter && year_filter !== "all") {
            filtered = filtered.filter(item => item.contenu.includes(year_filter));
        }

        if (programme_filter && programme_filter !== "all") {
            filtered = filtered.filter(item => item.contenu.includes(programme_filter));
        }

        if (search) {
            filtered = filtered.filter(item => {
                let content = lang === "en" ? item.contenu_en : item.contenu;
                let title = lang === "en" ? item.titre_en : item.titre;
                return content.toLowerCase().includes(search.toLowerCase()) || title.toLowerCase().includes(search.toLowerCase());
            });
        }

        setFilteredData(filtered);
    };



    return (
        <>
            {!slugTwo && (
                <>
                    <h1 className="text-primary">{lang === "en" ? data.titre_en : data.titre}</h1>
                    <div className="my-4">
                        <div
                            dangerouslySetInnerHTML={{ __html: data.contenu }}
                        />
                    </div>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {filteredData?.map((data, idx) => {
                            return (
                                <div className="col " onClick={e => detail(e, data.slug)}>
                                    <div className="position-relative">
                                        <img
                                            width={"100%"}
                                            src={URL + data.image}
                                            alt={lang === 'en' ? data.titre_en : data.titre}
                                        />
                                    </div>
                                    <div className="py-3">
                                        <span className="d-block fw-bold mb-3">
                                        {lang === 'en' ? data.titre_en : data.titre}
                                        </span>
                                        {/**
                                 * <span className="d-block text-muted mb-3">
                                    De la dizaine de centres de recherche sur
                                    les STIES sur le continent, aucune ne se
                                    trouve en Afrique francophone.
                                </span>
                                 */}
                                        <span className="d-block text-muted mb-3">
                                            <Calendar />{" "}
                                            {new Date(
                                                data.created_at
                                            ).toLocaleDateString() +
                                                " à " +
                                                new Date(
                                                    data.created_at
                                                ).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {
                        /**<div className="d-flex justify-content-center mt-4">
                        <div className="btn border">Voir tous les projets</div>
                    </div> */
                    }
                </>
            )}
            {slugTwo && (
                <>
                    <div className="my-2">
                        <button className="btn btn-sm btn-primary" onClick={e => {
                            e.preventDefault()
                            window.history.back()
                        }}>retour</button>
                    </div>
                    <div className="position-relative">
                        <img width={"100%"} src={URL + data.image} alt={lang === 'en' ? data.titre_en : data.titre} />
                        <div>
                            <span className="d-block text-muted mb-3">
                                <Calendar />{" publier le "}
                                {new Date(
                                    data.created_at
                                ).toLocaleDateString() +
                                    " à " +
                                    new Date(
                                        data.created_at
                                    ).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                    <h1 className="text-primary">{data.titre}</h1>
                    <div className="my-4">
                        <div
                            dangerouslySetInnerHTML={{ __html: data.contenu }}
                        />
                    </div>
                </>
            )}
        </>
    );
};
