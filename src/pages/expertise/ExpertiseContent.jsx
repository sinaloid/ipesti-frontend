import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import request, { URL } from "../../services/request";
import endPoint from "../../services/endPoint";

export const ExpertiseContent = ({ data, slug }) => {
    const { slugOne, slugTwo } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState({});
    const [index, setIndex] = useState(0);
    const [detail, setDetail] = useState({
        isset: false,
        data: {},
    });
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
    }, [data, slugOne]);

    const changerView = (slug) => {
        navigate("/ipesti/" + slug);
    };

    const get = () => {
        request
            .get(endPoint.categories + "/" + slugOne)
            .then((res) => {
                //console.log(res.data);
                setContent(res.data.data);
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
    };

    const section = {
        fr:["Collecte et analyse", "Elaboration", "Diffusion"],
        en:["Collection and analysis", "Elaboration", "Diffusion"]
    }
    return (
        <div className="col-12 col-md-8">
            {/**<h4 className="text-primary mb-3">{content.titre}</h4> */}
            <div className="d-flex mb-1 border-bottom">
                <span className="text-primary fs-20 fw-bold">
                    {
                        lang === "en" ? content.titre_en : content?.titre
                    }
                </span>
                {/*content.toutes_sous_categories?.map((item, idx) => {
                    return (
                        <div
                            key={"scat" + idx}
                            className={`cursor border-bottom me-4 ${
                                item.slug === slugTwo
                                    ? "border-color fw-bold"
                                    : "text-opacity-70"
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                setIndex(idx);
                                changerView(slug + "/" + item.slug);
                                setDetail({
                                    isset:false,
                                    data:[]
                                })
                                setSectionDetail({})
                            }}
                        >
                            {item.titre}
                        </div>
                    );
                })*/}
            </div>

            <>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex flex-wrap">
                            {section[lang].map(
                                (data, idx) => {
                                    if (
                                        idx === 0 &&
                                        sectionDetail === ""
                                    ) {
                                        setSectionDetail(data);
                                    }
                                    return (
                                        <div
                                            className={`me-4 mt-3 cursor p-2 ${sectionDetail ===
                                                data &&
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
                                }
                            )}
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
        </div>
    );
};
