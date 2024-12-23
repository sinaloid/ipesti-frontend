import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import request, { URL } from "../../services/request";
import endPoint from "../../services/endPoint";

const initDetail = {
    isset: false,
    data: {},
}
export const EquipeContent = ({ data, slug }) => {
    const { slugOne, slugTwo } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState({});
    const [index, setIndex] = useState(0);
    const [detail, setDetail] = useState(initDetail);
    const [sectionDetail, setSectionDetail] = useState("");

    const [lang, setLang] = useState(localStorage.getItem("lang") || "FR");

    useEffect(() => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang && storedLang !== lang) {
            setLang(storedLang);
        }
    }, [lang]);

    useEffect(() => {
        console.log(data);
        get();
        if (
            slugTwo === undefined &&
            data.children !== undefined &&
            data.children?.length !== 0
        ) {
            changerView(data.slug + "/" + data?.children[0]?.slug);
        }
    }, [data, slugOne, slugTwo]);

    const changerView = (slug) => {
        navigate("/ipesti/" + slug);
    };

    const get = () => {
        request
            .get(endPoint.categories + "/" + slugOne)
            .then((res) => {
                //console.log(res.data);
                setContent(res.data.data);
                setDetail(initDetail)
                setSectionDetail("")
                res.data.data.toutes_sous_categories?.map((item, idx) => {
                    if (item.slug === slugTwo) {
                        setIndex(idx)
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const dataSelected = (data) => {
        setDetail({
            isset: true,
            data: data,
        });
        window.scrollTo(0, 0);
    };

    const currentIndex = () => {

        setIndex(idx);
    }
    return (
        <div className="col-12 col-md-8">
            <h1 className="text-primary mb-4">{lang === "en" ? content.titre_en : content.titre}</h1>
            <div className="d-flex flex-wrap mb-4 border-bottom">
                {content.toutes_sous_categories?.map((item, idx) => {
                    return (
                        <div
                            key={"scat" + idx}
                            className={`cursor border-bottom p-2 ${item.slug === slugTwo
                                    ? "border-color text-white fw-bold bg-primary"
                                    : "text-opacity-70"
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                setIndex(idx);
                                changerView(slug + "/" + item.slug);
                                setDetail(initDetail)
                                setSectionDetail({})
                            }}
                        >
                            {lang === "en" ? item.titre_en : item.titre}
                        </div>
                    );
                })}
            </div>

            {content.toutes_sous_categories &&
                content.toutes_sous_categories?.length !== 0 && (
                    <>
                        <span className="text-primary fs-18 fw-bold mb-4 d-inline-block">
                            {lang === "en" ? content.toutes_sous_categories[index].titre_en : content.toutes_sous_categories[index].titre}
                        </span>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: lang === "en" ? content.toutes_sous_categories[index].contenu_en : content.toutes_sous_categories[index].contenu,
                            }}
                        />
                        {!detail.isset && (
                            <div className="row row-cols-1 row-cols-md-2  g-4 mb-4">
                            {content.toutes_sous_categories[
                                index == "2" ? "1" : index
                            ]?.toutes_sous_categories.map(
                                (data, idx) => {
                                    if (data.is_deleted) {
                                        return
                                    }
                                    return (
                                        <div
                                            key={data.slug}
                                            className="col"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                //setViewContent(!viewContent);
                                                dataSelected(data);
                                            }}
                                        >
                                            <div className="d-flex">
                                                <img
                                                    className="rounded-3"
                                                    width={"80px"}
                                                    height={"80px"}
                                                    src={
                                                        URL +
                                                        "" +
                                                        data.image
                                                    }
                                                />
                                                <div className="ps-2 fs-14">
                                                    <div>
                                                        <div
                                                            className="profile-detail"
                                                            dangerouslySetInnerHTML={{
                                                                __html: lang === "en" ? data.htmlOne_en : data.htmlOne,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                        )}
                        {detail.isset && (
                            <>
                            <button className="btn btn-sm btn-primary mb-4" onClick={e => {
                                e.preventDefault();
                                setDetail(initDetail);
                                setSectionDetail("");
                            }}>Fermer</button>
                                <div className="row">
                                    <div className="col">
                                        <div className="d-flex">
                                            <img
                                                className="rounded-3"
                                                width={"100px"}
                                                height={"100px"}
                                                src={
                                                    URL + "" + detail.data.image
                                                }
                                            />
                                            <div className="ps-2">
                                                <div>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: lang === "en" ? detail.data.htmlOne_en : detail.data.htmlOne,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 my-4">
                                        <div className="d-flex flex-wrap border-bottom">
                                            {detail.data.toutes_sous_categories.length !== 0 && detail.data.toutes_sous_categories.map(
                                                (data, idx) => {
                                                    if (idx === 0 && sectionDetail?.titre === undefined) {
                                                        setSectionDetail(
                                                            data
                                                        );
                                                    }
                                                    return (
                                                        <div
                                                            className={`me-4 mt-3 cursor p-2 ${sectionDetail?.titre === data.titre && "bg-primary text-white fw-bold"}`}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                //setViewContent(!viewContent);
                                                                setSectionDetail(
                                                                    data
                                                                );
                                                            }}
                                                        >
                                                            {lang === "en" ? data.titre_en : data.titre}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                        <p className="py-2">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: lang === "en" ? sectionDetail?.contenu_en : sectionDetail?.contenu,
                                                }}
                                            />
                                        </p>
                                    </div>
                                    {/**
                                     * <div>
                                        <button className="btn btn-primary">Voir le CV complet</button>
                                    </div>
                                     */}
                                </div>
                            </>
                        )}
                    </>
                )}
        </div>
    );
};
