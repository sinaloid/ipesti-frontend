import { useEffect, useRef, useState } from "react";
import endPoint from "../services/endPoint";
import request, { URL } from "../services/request";
import { Input } from "../components/Input";
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

export const ViewTable = () => {
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

    const [contenu, setContenu] = useState("");
    const [profile, setProfile] = useState("");
    const [contenuInit, setContenuInit] = useState("");
    const [profileInit, setProfileInit] = useState("");
    const [initvalue, setInitValue] = useState("");
    const [text, setText] = useState("");
    useEffect(() => {
        get();
    }, [slug]);
    const formik = useFormik({
        initialValues: initData,
        onSubmit: (values) => {
            values.parent = slug;
            values.contenu = contenu;
            values.htmlOne = profile;
            console.log(values);
            if (values.id) {
                update(values);
            } else {
                post(values);
            }
        },
    });

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

                console.log(tab);

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
            .post(endPoint.categories_admin + "/" + values.id, values)
            .then((res) => {
                console.log(res.data);
                close.current.click();
                get();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const destroy = () => {
        request
            .delete(endPoint.categories_admin + "/" + viewData.id)
            .then((res) => {
                console.log(res.data);
                closeDelete.current.click();
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

    const onSelectData = (e, data) => {
        e.preventDefault();
        setViewData(data);
    };

    const editData = (e, data) => {
        e.preventDefault();
        formik.setFieldValue("_method", "put");
        formik.setFieldValue("id", data.id);
        formik.setFieldValue("titre", data.titre);
        formik.setFieldValue("description", data.description);
        formik.setFieldValue("contenu", data.contenu);
        setContenuInit(data.contenu);
        setProfileInit(data.htmlOne);
    };

    const goToDetail = (e, slug) => {
        e.preventDefault();
        navigate("/dashboard/categories/pages/" + slug);
    };

    const goTo = (e, id) => {
        e.preventDefault();
        navigate(""+id);
    };

    const onContenuChange = (newValue, editor) => {
        setContenu(newValue);
    };

    const onProfileChange = (newValue, editor) => {
        setProfile(newValue);
    };
    return (
        <>
            
            <div className="row mb-3">
                <div className="col-12">
                    <h1 className="text-start mb-3 fs-30">
                        Liste des sous sections
                    </h1>
                    <div className="d-flex">
                        <div className="d-flex align-items-center me-auto">
                            <div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Rechercher..."
                                    />
                                    <span className="input-group-text">
                                        recherche
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span
                                    className="ms-2 cursor"
                                    onClick={(e) => changePage(e, "-1")}
                                >
                                    Prec
                                </span>
                                <span
                                    className="mx-2 cursor"
                                    onClick={(e) => changePage(e, "+1")}
                                >
                                    Suiv
                                </span>
                            </div>
                            <span className="fw-bold">
                                Page {pages.index + 1} / {pages.list.length}
                            </span>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#add"
                                onClick={(e) => formik.resetForm()}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Section</th>
                                <th scope="col">Description</th>
                                <th scope="col">Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.small.map((data, idx) => {
                                if (data.is_deleted) {
                                    return null;
                                }
                                return (
                                    <tr key={idx}>
                                        <th scope="row">{idx + 1}</th>
                                        <td>
                                            <div className="d-flex">
                                                {data.image && (
                                                    <>
                                                        <img
                                                            width={"64px"}
                                                            src={
                                                                URL + data.image
                                                            }
                                                            alt=""
                                                        />
                                                    </>
                                                )}

                                                <div className="text-100">
                                                    {data.titre}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-200">
                                                {data.description}
                                            </p>
                                        </td>
                                        <td>
                                            {new Date(
                                                data.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <div className="btn-group">
                                                {
                                                    /**
                                                     * <button
                                                    className="btn btn-primary-light mx-1 rounded-3"
                                                    onClick={(e) =>
                                                        //onSelectData(e, data)
                                                        goToDetail(e, data.slug)
                                                    }
                                                >
                                                    Voir
                                                </button>
                                                     */
                                                }
                                                <button
                                                    className="btn btn-primary mx-1 rounded-3"
                                                    onClick={(e) =>
                                                        goTo(e, data.id)
                                                    }
                                                >
                                                    Voir
                                                </button>
                                                <button
                                                    className="btn btn-warning mx-1 rounded-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#add"
                                                    onClick={(e) =>
                                                        editData(e, data)
                                                    }
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    className="btn btn-danger mx-1 rounded-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete"
                                                    onClick={(e) =>
                                                        onSelectData(e, data)
                                                    }
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div
                className="modal fade"
                id="produit"
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
                                placeholder="Nom de la catégorie"
                                name={"titre"}
                                formik={formik}
                            />
                            <Input
                                type={"file"}
                                placeholder="image du produit"
                                name={"image"}
                                formik={formik}
                            />
                            <Input
                                type={"textarea"}
                                placeholder="Description du produit"
                                name={"description"}
                                formik={formik}
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
            <div
                className="modal fade"
                id="delete"
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
                                Supprimer les données
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-start">
                            Voulez-vous continuer ?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                ref={closeDelete}
                            >
                                Non
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={destroy}
                            >
                                Oui
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade modal-lg" id="view">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Détails
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-start">
                            <div className="d-flex">
                                <img
                                    width={"160px"}
                                    height={"160px"}
                                    src={URL + viewData.image}
                                    alt=""
                                />
                                <div className="ps-3">
                                    <span className="fw-bold fs-20">
                                        {viewData.nom}
                                    </span>
                                    <br />
                                    <span>Créer le : </span>
                                    <span className="text-muted">
                                        {new Date(
                                            viewData.created_at
                                        ).toLocaleDateString()}
                                    </span>
                                    <br />
                                    <br />
                                    <p>{viewData.description}</p>
                                </div>
                            </div>
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
            <AppRoute type={"detailOfPage"} />
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
