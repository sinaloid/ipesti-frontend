import { useEffect, useRef, useState } from "react";

import endPoint from "../../services/endPoint";
import request, { URL } from "../../services/request";
import { Input } from "../../components/Input";
import { useFormik } from "formik";
import { pagination } from "../../services/function";
import { useNavigate, useParams } from "react-router-dom";
import { MenuDashboard } from "../../components/MenuDashboard";
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
export const DashIpesti = ({ slug = "ipesti" }) => {
    const [datas, setDatas] = useState({
        all: [],
        small: [],
    });
    const [categories, setCategories] = useState([]);
    const [pages, setPages] = useState({
        list: [],
        counter: 0,
        index: 0,
    });
    const close = useRef();

    const [slugOne, setSlugOne] = useState("");
    const [detail, setDetail] = useState({});
    const [currentElement, setCurrentElement] = useState({});
    const [viewData, setViewData] = useState({});
    const [value, setValue] = useState("");
    const [initvalue, setInitValue] = useState("");
    const [text, setText] = useState("");
    const {id} = useParams()
    const navigate = useNavigate()

    const tabBtn = [
        "Histoire",
        "Vision & Missions",
        "Structure & Gouvernance",
        "équipes",
        "Partenaires de recherche",
        "Opportunités",
        "Prix & distinctions",
    ];
    useEffect(() => {
        get(id);
    }, [slug,id]);

    const formik = useFormik({
        initialValues: initData,
        onSubmit: (values) => {
            values.contenu = value;

            console.log(values);
            ///post(values);
            if (values.slug) {
                values._method = "put";
                values.parent = "";
                update(values);
                formik.resetForm();
            } else {
                values.parent = currentElement.slug;
                post(values);
                formik.resetForm();
            }
        },
    });

    const get = (id) => {
        const slugData = id ? id : slug
        console.log(slugData)
        request
            .get(endPoint.categories + "/" + slugData)
            .then((res) => {
                console.log(res.data);
                setDetail(res.data.data);
                if (res.data.data.toutes_sous_categories.length !== 0) {
                    setCurrentElement(res.data.data.toutes_sous_categories[0]);
                    //setSlugOne(res.data.data.toutes_sous_categories[0].slug)
                } else {
                    setCurrentElement({});
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

    const changePage = (e, values) => {
        e.preventDefault();
        const pageNumber = pages.index + parseInt(values);
        console.log(pageNumber);
        if (pageNumber >= 0 && pageNumber < pages.counter) {
            setPages({ ...pages, index: pageNumber });
            setDatas({
                ...datas,
                small: pages.list[pageNumber],
            });
        }
    };

    const onEditorInputChange = (newValue, editor) => {
        console.log(editor.getContent({ format: "text" }));
        setValue(newValue);
        setText(editor.getContent({ format: "text" }));
    };

    const editData = (e, data) => {
        e.preventDefault();
        formik.setFieldValue("slug", data.slug);
        formik.setFieldValue("titre", data.titre);
        formik.setFieldValue("contenu", data.contenu);
        setInitValue(data.contenu);
    };

    const view = (e, data) => {
        e.preventDefault();
        console.log(data);
        setViewData(data);
    };

    const goTo = (e, id) => {
        e.preventDefault()
        navigate("/dashboard/ipesti/"+id)
        get(id)
    }
    return (
        <>
            <div className="row mb-3">
                <div className="col-12">
                    <div className="d-flex">
                        <div className="me-auto">
                            {detail.toutes_sous_categories?.map((data, idx) => {
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        className={`btn me-2 mb-3 ${
                                            data.slug === currentElement.slug
                                                ? "btn-primary"
                                                : "btn-secondary"
                                        }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentElement(data);
                                            setSlugOne(data.slug);
                                        }}
                                    >
                                        {data.titre}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="my-4">
                        <h2>{currentElement.titre}</h2>
                        <div>
                            <span
                                className="cursor me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#view"
                                onClick={(e) => view(e, currentElement)}
                            >
                                Voir
                            </span>
                            <span
                                className="cursor me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#add"
                                onClick={(e) => editData(e, currentElement)}
                            >
                                Modifiers
                            </span>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <div className="d-flex align-items-center me-auto">
                            <div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Rechercher..."
                                    />
                                    <span className="input-group-text">
                                        SearchIcon
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span
                                    className="ms-2"
                                    //onClick={(e) => changePage(e, "-1")}
                                >
                                    PrevIcon
                                </span>
                                <span
                                    className="ms-2"
                                    //onClick={(e) => changePage(e, "+1")}
                                >
                                    SuivIcon
                                </span>
                            </div>
                            <span className="fw-bold">
                                Page {/*pages.index + 1} / {pages.list.length*/}
                            </span>
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary ms-auto"
                            data-bs-toggle="modal"
                            data-bs-target="#add"
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Titre</th>
                                <th scope="col">Date de création</th>
                                <th scope="col" className="text-end">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentElement.toutes_sous_categories?.map(
                                (data, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <th scope="row">{idx + 1}</th>

                                            <td>{data.titre}</td>
                                            <td>12/12/2023</td>
                                            <td className="text-end">
                                                <div className="btn-group">
                                                    <button
                                                        className="btn btn-primary mx-1 rounded-3"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#view"
                                                        onClick={(e) =>
                                                            view(e, data)
                                                        }
                                                    >
                                                        Voir
                                                    </button>
                                                    <button
                                                        className="btn btn-success mx-1 rounded-3"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#add"
                                                        onClick={(e) =>
                                                            editData(e, data)
                                                        }
                                                    >
                                                        Modifier
                                                    </button>
                                                    <button
                                                        className="btn btn-primary mx-1 rounded-3"
                                                        onClick={(e) =>
                                                            goTo(e, data.slug)
                                                        }
                                                    >
                                                        Détails
                                                    </button>
                                                    <button className="btn btn-danger mx-1 rounded-3">
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div
                className="modal fade"
                id="view"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                {viewData.titre}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <img
                                    width={"100%"}
                                    src={URL + viewData.image}
                                    alt=""
                                />
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: viewData.contenu,
                                }}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="add"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Ajout d'un nouvelle catégorie
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
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
                                initialValue={initvalue}
                                onEditorChange={(newValue, editor) =>
                                    onEditorInputChange(newValue, editor)
                                }
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                ref={close}
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={formik.handleSubmit}
                            >
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
