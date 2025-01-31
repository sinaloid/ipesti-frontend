import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request, { URL } from "../../services/request";
import endPoint from "../../services/endPoint";
import rech from "../../assets/images/recherche.png";
import { Calendar } from "../../icons/Calendar";

export const PublicationContent = ({ year_filter, programme_filter, search = "" }) => {
    const { slugOne } = useParams();
    const [data, setData] = useState({});
    const [lang, setLang] = useState(localStorage.getItem("lang") || "FR");
    const [filteredData, setFilteredData] = useState([]);
    const [sectionDetail, setSectionDetail] = useState("");

    useEffect(() => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang && storedLang !== lang) {
            setLang(storedLang);
        }
    }, [lang]);

    useEffect(() => {
        get();
    }, [slugOne]);

    useEffect(() => {
        filterContent();
    }, [data, year_filter, programme_filter, search]);

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
                return content.toLowerCase().includes(search.toLowerCase());
            });
        }

        setFilteredData(filtered);
    };

    const get = () => {
        request
            .get(endPoint.categories + "/" + slugOne)
            .then((res) => {
                //console.log(res.data)
                // Expression régulière pour extraire les dates (4 chiffres consécutifs à la fin de chaque article)
                const dateRegex = /\b\d{4}\b/g;
                //const dateRegex = /\b\d{4}\b(?=\s*$)/gm;
                let dates = []
                const list = res.data.data.toutes_sous_categories.map(item => {


                    // Extraction des dates
                    dates = item.contenu.match(dateRegex);
                    console.log(dates)
                    dates = dates ? dates : [new Date().getFullYear()];
                    return { ...item, dates: dates }
                });
                setData({
                    ...res.data.data,
                    toutes_sous_categories: list
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const truncateText = (text, maxLength = 100) => {
        return text?.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <>
            {
                sectionDetail.titre !== undefined && <div className="my-2">
                    <button className="btn btn-sm btn-primary" onClick={e => {
                        e.preventDefault()
                        setSectionDetail({})
                    }}>retour</button>
                </div>
            }
            <h1 className="text-primary">{lang === 'en' ? data.titre_en : data.titre}</h1>
            <div className="my-4">
                <div dangerouslySetInnerHTML={{ __html: lang === "en" ? data.contenu_en : data.contenu }} />
            </div>



            {
                sectionDetail.titre === undefined ? <>
                    <div className="row row-cols-1 g-4 d-md-none">
                        {filteredData.map((item, idx) => (
                            <div key={idx + "-mobile"} className="col">
                                <div onClick={(e) => {
                                    e.preventDefault();
                                    setSectionDetail(item);
                                }}>
                                    <img width={"100%"} src={URL + item.image} alt={lang === "en" ? item.titre_en : item.titre} />
                                </div>
                                <div>

                                    <div className="fw-bold" dangerouslySetInnerHTML={{ __html: lang === "en" ? truncateText(item.contenu_en, 100) : truncateText(item.contenu, 100) }} />
                                    <div className="d-flex align-items-center">
                                        <Calendar /><span className="text-muted ms-1">{" Article publié en " + item?.dates[item.dates?.length - 1]}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row row-cols-md-2 g-4 d-none d-md-flex">
                        {filteredData.map((item, idx) => (
                            <div key={idx} className="col">
                                <div onClick={(e) => {
                                    e.preventDefault();
                                    setSectionDetail(item);
                                }}>
                                    <div className="me-2">
                                        <img width={"100%"} src={URL + item.image} alt={lang === "en" ? item.titre_en : item.titre} />
                                    </div>
                                    <div>

                                        <div className="fw-bold" dangerouslySetInnerHTML={{ __html: lang === "en" ? truncateText(item.contenu_en, 100) : truncateText(item.contenu, 100) }} />
                                        <div className="d-flex align-items-center">
                                            <Calendar /><span className="text-muted ms-1">{" Article publié en " + item.dates[item.dates.length - 1]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <div className="btn border">{lang === "en" ? "View All" : "Voir tous"}</div>
                    </div>
                </> :
                    <>

                        <div className="row">
                            <div className="col-12">
                                <h6 className="text-primary fs-20">
                                    {lang === "en" ? sectionDetail.titre_en : sectionDetail?.titre}
                                </h6>
                                <div className="me-2">
                                    <img width={"100%"} src={URL + sectionDetail.image} alt={lang === "en" ? sectionDetail.titre_en : sectionDetail?.titre} />
                                </div>
                                <div className="d-flex align-items-center">
                                    <Calendar /><span className="text-muted ms-1">{" Article publié en " + sectionDetail.dates[sectionDetail.dates.length - 1]}</span>
                                </div>
                                <p className="py-2">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: lang === "en" ? sectionDetail.contenu_en : sectionDetail?.contenu,
                                        }}
                                    />
                                </p>
                            </div>
                        </div>
                    </>
            }
        </>
    );
};
