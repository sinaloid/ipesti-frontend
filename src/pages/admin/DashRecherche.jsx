import { useEffect, useRef, useState } from "react";

import endPoint from "../../services/endPoint";
import request from "../../services/request";
import { Input } from "../../components/Input";
import { useFormik } from "formik";
import { pagination } from "../../services/function";

const initProduit = {
    label: "",
    code: "",
    description: "",
    categories: "",
    prix: "",
    image: "",
    boutiqueId: 1,
};
export const DashRecherche = () => {
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

    const tabBtn = [
        "Programmes de recherche",
        "Projets de recherche",
        "Séminaires de recherche",
        "Tous les séminaires de l’IPESTI",
    ];
    useEffect(() => {
        get();
        getCategories();
    }, []);
    const formik = useFormik({
        initialValues: initProduit,
        onSubmit: (values) => {
            console.log(values);
            post(values);
        },
    });
    const get = () => {
        request
            .get(endPoint.produits + "/1/boutiques")
            .then((res) => {
                const tab = pagination(res.data.produits.data, 10);

                console.log(tab);

                if (tab.counter !== 0) {
                    setDatas({
                        all: res.data.produits.data,
                        small: tab.list[0],
                    });
                    setPages(tab);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const post = (values) => {
        request
            .post(endPoint.produits, values)
            .then((res) => {
                console.log(res.data);
                close.current.click();
                get();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getCategories = () => {
        request
            .get(endPoint.categories)
            .then((res) => {
                console.log(res.data.categories.data);
                setCategories(res.data.categories.data);
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
    return (
        <>
            <div className="row mb-3">
                <div className="col-12">
                    <h1 className="text-start mb-3">Liste des recherches</h1>
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
                                    onClick={(e) => changePage(e, "-1")}
                                >
                                    PrevIcon
                                </span>
                                <span
                                    className="ms-2"
                                    onClick={(e) => changePage(e, "+1")}
                                >
                                    SuivIcon
                                </span>
                            </div>
                            <span className="fw-bold">
                                Page {pages.index + 1} / {pages.list.length}
                            </span>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="me-auto">
                            {tabBtn.map((data, idx) => {
                                return (
                                    <button
                                    key={idx}
                                        type="button"
                                        className="btn btn-primary me-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#produit"
                                    >
                                        {data}
                                    </button>
                                );
                            })}
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#produit"
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
                                <th scope="col">Auteur</th>
                                <th scope="col">Description</th>
                                <th scope="col">Date de création</th>
                                <th scope="col" className="text-end">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(8).keys()].map((data, idx) => {
                                return (
                                    <tr key={idx}>
                                        <th scope="row">{idx + 1}</th>
                                        <td>
                                            <span>Sanou Ali</span>
                                            <br />
                                            <span className="text-muted fs-14">
                                                Secretaire
                                            </span>
                                        </td>
                                        <td>
                                            Festival de l’Histoire des Science
                                            et des Techniques Burkina Faso 2023
                                        </td>
                                        <td>12/12/2023</td>
                                        <td className="text-end">
                                            <div className="btn-group">
                                                <button className="btn btn-primary mx-1 rounded-3">
                                                    Voir
                                                </button>
                                                <button className="btn btn-success mx-1 rounded-3">
                                                    Modifier
                                                </button>
                                                <button className="btn btn-danger mx-1 rounded-3">
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
                                Ajout d'une nouvelle catégorie
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
                                placeholder="Label de la categorie"
                                name={"label"}
                                formik={formik}
                            />
                            <Input
                                type={"select"}
                                placeholder="categories du produit"
                                name={"categories"}
                                formik={formik}
                                options={categories}
                            />

                            <Input
                                type={"text"}
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
