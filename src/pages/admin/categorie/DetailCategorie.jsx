import { useEffect, useRef, useState } from "react";
import endPoint from "../../../services/endPoint";
import request, { URL } from "../../../services/request";
import { Input } from "../../../components/Input";
import { useFormik } from "formik";
import { pagination } from "../../../services/function";
import { useNavigate, useParams } from "react-router-dom";
import AppRoute from "../../../routes/AppRoute";
import { Editor } from "@tinymce/tinymce-react";
import { ViewTable } from "../../../components/ViewTable";
import { ViewContent } from "../../../components/ViewContent";
import { ViewEditor } from "../../../components/ViewEditor";
const lang = URL + "assets/langs/fr_FR.js";

const initData = {
    titre: "",
    contenu: "",
    htmlOne: "",
    email: "",
    image: "",
    lien: "",
};

export const DetailCategorie = () => {
    const [view,setView] = useState("voir")
    const [datas, setDatas] = useState({
        all: [],
        small: [],
    });
    const [pages, setPages] = useState({
        list: [],
        counter: 0,
        index: 0,
    });
    const close = useRef();
    const [detail, setDetail] = useState("");
    const { slug } = useParams();
    
    useEffect(() => {
        get();
    }, [slug]);
    

    const get = () => {
        request
            .get(endPoint.categories_admin + "/" + slug)
            .then((res) => {
                //console.log(res.data.data);
                setDetail(res.data.data);
                const tab = pagination(
                    res.data.data.toutes_sous_categories,
                    10
                );

                //console.log(tab);

                if (tab.counter !== 0) {
                    setDatas({
                        all: res.data.data.toutes_sous_categories,
                        small: tab.list[0],
                    });
                    setPages(tab);
                } else {
                    setDatas({
                        all: [],
                        small: [],
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const post = (values) => {
        request
            .post(endPoint.categories_admin, values)
            .then((res) => {
                console.log(res.data);
                close.current.click();
                get();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const update = (values) => {
        request
            .post(endPoint.categories_admin + "/" + values.slug, values)
            .then((res) => {
                console.log(res.data);
                close.current.click();
                get();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    

    
    return (
        <>
            <div className="row mb-5">
                <div className="col-12">
                    <div className="d-flex">
                        <span className="fs-40 ">Section : </span>
                        <div className="ms-3 text-start">
                            <span className="fw-bold fs-40 ">
                                {detail.titre}
                            </span>
                            <p className="text-start">{detail.description}</p>
                            <div>
                                <span
                                    className="cursor me-2"
                                    onClick={(e) => setView("voir")}
                                >
                                    Voir
                                </span>
                                <span
                                    className="cursor me-2"
                                    onClick={(e) => setView("editer")}
                                >
                                    Modifiers
                                </span>
                                <span
                                    className="cursor me-2"
                                    
                                    onClick={(e) => setView("sections")}
                                >
                                    Sections
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {view === "voir" && <ViewContent />}
            {view === "sections" && <ViewTable />}
            {view === "editer" && <ViewEditor />}
        </>
    );
};
