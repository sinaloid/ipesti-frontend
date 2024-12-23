import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import request from "../../services/request";
import endPoint from "../../services/endPoint";

export const MultiContent = () => {
    const { slugOne, slugTwo } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState({});
    const [index, setIndex] = useState(0);
    const [lang, setLang] = useState(localStorage.getItem("lang") || "FR");

    useEffect(() => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang && storedLang !== lang) {
            setLang(storedLang);
        }
    }, [lang]);

    useEffect(() => {
        get();
    }, [slugOne, slugTwo]);

    const changerView = (slug) => {
        navigate("/ipesti/" + slug);
    };

    const get = () => {
        request
            .get(endPoint.categories + "/" + slugOne)
            .then((res) => {
                setContent(res.data.data);
                res.data.data.toutes_sous_categories?.map((item, idx) => {
                    if (item.slug === slugTwo) {
                        setIndex(idx);
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="col-12 col-md-8">
            <h1 className="text-primary mb-4">
                {lang === "en" ? content.titre_en : content.titre}
            </h1>
            <div className="d-flex mb-4 border-bottom">
                {content.toutes_sous_categories?.map((item, idx) => {
                    return (
                        <div
                            key={"scat" + idx}
                            className={`cursor border-bottom p-2 ${
                                item.slug === slugTwo
                                    ? "border-color text-white fw-bold bg-primary"
                                    : "text-opacity-70"
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                setIndex(idx);
                                changerView(slugOne + "/" + item.slug);
                            }}
                        >
                            {lang === "en" ? item.titre_en : item.titre}
                        </div>
                    );
                })}
            </div>

            {content.toutes_sous_categories && content.toutes_sous_categories.length !== 0 && (
                <>
                    <span className="text-primary fs-18 fw-bold mb-4 d-inline-block">
                        {lang === "en" ? content.toutes_sous_categories[index].titre_en : content.toutes_sous_categories[index].titre}
                    </span>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: lang === "en" ? content.toutes_sous_categories[index].contenu_en : content.toutes_sous_categories[index].contenu,
                        }}
                    />
                </>
            )}
        </div>
    );
};
