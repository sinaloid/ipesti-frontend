import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request, { URL } from "../../services/request";
import endPoint from "../../services/endPoint";
import rech from "../../assets/images/recherche.png";

export const RechercheContent = ({ }) => {
    const { slugOne } = useParams();
    const [data, setData] = useState({});
    const [seletedData, setSelectedData] = useState({});
    const [sectionDetail, setSectionDetail] = useState("");
    const [lang, setLang] = useState(localStorage.getItem("lang") || "fr");
    const section = {
        fr: ["Laboratoires associés", "Descriptif", "Axes de recherche", "Projets", "Equipe scientifique"],
        en: ["Associated laboratories", "Descriptive", "Research axes", "Projects", "Scientific team"]
    }
    useEffect(() => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang && storedLang !== lang) {
            setLang(storedLang);
        }
    }, [lang]);
    useEffect(() => {
        get();
    }, [slugOne]);

    const get = () => {
        request
            .get(endPoint.categories + "/" + slugOne)
            .then((res) => {
                //console.log(res.data)
                setData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    

    return (
        <>
            <h1 className="text-primary">{lang === "en" ? data.titre_en : data.titre}

            </h1>
            <div className="my-4">
                <div dangerouslySetInnerHTML={{ __html: lang === "en" ? data.contenu_en : data.contenu }} />
            </div>
            {seletedData.titre === undefined ? (
                <>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {data.toutes_sous_categories?.map((data, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="col cursor"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedData(data);
                                    }}
                                >
                                    <div className="position-relative">
                                        <img
                                            width={"100%"}
                                            src={URL + data.image}
                                            alt={lang === "en" ? data.titre_en : data.titre}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/*<div className="d-flex justify-content-center mt-4">
                        <div className="btn border">Voir tous les projets</div>
                    </div>*/}
                </>
            ) : (
                <>
                    <div className="mb-2">
                        <button className="btn btn-sm btn-primary" onClick={e => {
                            e.preventDefault()
                            setSelectedData({})
                        }}>retour</button>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h6 className="text-primary fs-20">
                                {lang === "en" ? seletedData.titre_en : seletedData.titre}
                            </h6>
                            <div>
                                <span className="fw-bold">
                                    {lang === "en" ? "" : "Institution de rattachement"}:
                                </span>
                            </div>
                            <div className="d-flex flex-wrap border-top mt-4">
                                {section[lang]?.map((data, idx) => {
                                    if (idx === 0 && sectionDetail === "") {
                                        setSectionDetail(data);
                                    }
                                    return (
                                        <div
                                            key={idx}
                                            className={`me-1 mt-3 cursor p-2 ${sectionDetail === data &&
                                                "bg-primary text-white fw-bold"
                                                }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                //setViewContent(!viewContent);
                                                setSectionDetail(data);
                                                console.log(data);
                                            }}
                                        >
                                            {data}
                                        </div>
                                    );
                                })}
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
            )}
        </>
    );
};
