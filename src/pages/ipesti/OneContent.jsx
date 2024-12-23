import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../../services/request";
import endPoint from "../../services/endPoint";

export const OneContent = () => {
    const { slugOne } = useParams();
    const [data, setData] = useState({});
    const [lang, setLang] = useState(localStorage.getItem("lang") || "FR");

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
        request.get(`${endPoint.categories}/${slugOne}`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="col-12 col-md-8">
            <h1 className="text-primary mb-4">{lang === "en" ? data.titre_en : data.titre}</h1>
            <div dangerouslySetInnerHTML={{ __html: lang === "en" ? data.htmlOne_en : data.htmlOne }} />
            <div dangerouslySetInnerHTML={{ __html: lang === "en" ? data.contenu_en : data.contenu }} />
        </div>
    );
};
