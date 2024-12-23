import { useEffect, useRef, useState } from "react";
import endPoint from "../services/endPoint";
import request, { URL } from "../services/request";
import { Input } from "./Input";
import { useFormik } from "formik";
import { pagination } from "../services/function";
import { useNavigate, useParams } from "react-router-dom";
import AppRoute from "../routes/AppRoute";
import { Editor } from "@tinymce/tinymce-react";
const lang = URL + "assets/langs/fr_FR.js";

const initData = {
    titre: "",
    contenu: "",
    htmlOne: "",
    email: "",
    image: "",
    lien: "",
};

export const ViewEditor = () => {
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
    const closeDelete = useRef();
    const [detail, setDetail] = useState("");
    const [viewData, setViewData] = useState({});
    const { slug } = useParams();
    const navigate = useNavigate();

    const [contenuInit, setContenuInit] = useState("");
    const [contenu, setContenu] = useState("");
    const [profileInit, setProfileInit] = useState("");
    const [profile, setProfile] = useState("");

    const [value, setValue] = useState("");
    const [initvalue, setInitValue] = useState("");
    const [text, setText] = useState("");
    useEffect(() => {
        get();
    }, [slug]);
    const formik = useFormik({
        initialValues: initData,
        onSubmit: (values) => {
            //values.parent = slug;
            values.contenu = contenu;
            values.htmlOne = profile;
            console.log(values);
            if (values.id) {
                update(values);
            }
        },
    });

    const get = () => {
        request
            .get(endPoint.categories_admin + "/" + slug)
            .then((res) => {
                console.log(res.data.data);
                setDetail(res.data.data);
                formik.setFieldValue("_method", "put");
                formik.setFieldValue("id", res.data.data.id);
                formik.setFieldValue("titre", res.data.data.titre);
                formik.setFieldValue("description", res.data.data.description);
                formik.setFieldValue("contenu", res.data.data.contenu);
                setContenuInit(res.data.data.contenu);
                setProfileInit(res.data.data.htmlOne);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const update = (values) => {
        request
            .post(endPoint.categories_admin + "/" + values.id, values)
            .then((res) => {
                console.log(res.data);
                //close.current.click();
                alert(res.data.message)
                get();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onContenuChange = (newValue, editor) => {
        setContenu(newValue);
    };

    const onProfileChange = (newValue, editor) => {
        setProfile(newValue);
    };

    return (
        <>
            <div className="row mb-3 border-bottom">
                <div className="col-12">
                    <h4 className="text-start mb-3">Modification du contenu</h4>
                </div>
            </div>
            <div className="modal-body">
                <Input
                    type={"text"}
                    label="Titre du contenu"
                    placeholder="Titre du contenu"
                    name={"titre"}
                    formik={formik}
                />
                <Input
                    type={"file"}
                    label="image"
                    placeholder="image"
                    name={"image"}
                    formik={formik}
                />
                <Input
                    type={"textarea"}
                    placeholder="Description du produit"
                    name={"description"}
                    formik={formik}
                />
                <div>Profile</div>
                <Editor
                    apiKey="inw3u1xr6hvvw2ezjwlonyy3wu489wqh6vl0437mbkfyakgv"
                    init={{
                        plugins:
                            " anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount  textcolor",
                        toolbar:
                            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat | forecolor backcolor",
                        tinycomments_mode: "embedded",
                        tinycomments_author: "Author name",
                        mergetags_list: [
                            {
                                value: "First.Name",
                                title: "First Name",
                            },
                            { value: "Email", title: "Email" },
                        ],
                        ai_request: (request, respondWith) =>
                            respondWith.string(() =>
                                Promise.reject(
                                    "See docs to implement AI Assistant"
                                )
                            ),
                        language: "fr_FR",
                        language_url: lang,
                        toolbar_mode: "wrap",
                    }}
                    initialValue={profileInit}
                    onEditorChange={(newValue, editor) =>
                        onProfileChange(newValue, editor)
                    }
                />
                <div>Contenu</div>
                <Editor
                    apiKey="inw3u1xr6hvvw2ezjwlonyy3wu489wqh6vl0437mbkfyakgv"
                    init={{
                        plugins:
                            " anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount  textcolor",
                        toolbar:
                            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat | forecolor backcolor",
                        tinycomments_mode: "embedded",
                        tinycomments_author: "Author name",
                        mergetags_list: [
                            {
                                value: "First.Name",
                                title: "First Name",
                            },
                            { value: "Email", title: "Email" },
                        ],
                        ai_request: (request, respondWith) =>
                            respondWith.string(() =>
                                Promise.reject(
                                    "See docs to implement AI Assistant"
                                )
                            ),
                        language: "fr_FR",
                        language_url: lang,
                        toolbar_mode: "wrap",
                    }}
                    initialValue={contenuInit}
                    onEditorChange={(newValue, editor) =>
                        onContenuChange(newValue, editor)
                    }
                />
            </div>
            <div className="my-3">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={formik.handleSubmit}
                >
                    Enregistrer
                </button>
            </div>
        </>
    );
};
