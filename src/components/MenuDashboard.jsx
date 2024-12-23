import { useEffect, useState } from "react";
import request from "../services/request";
import endPoint from "../services/endPoint";

export const MenuDashboard = ({ slug, setSlugOne }) => {
    const [list, setList] = useState([]);
    const [detail, setDetail] = useState({});
    const [currentElement, setCurrentElement] = useState({});

    useEffect(() => {
        get();
    }, []);

    const get = () => {
        request
            .get(endPoint.categories + "/" + slug)
            .then((res) => {
                //console.log(res.data);
                setDetail(res.data.data);
                if(res.data.data.toutes_sous_categories.length !== 0){
                    setCurrentElement(res.data.data.toutes_sous_categories[0]);
                    setSlugOne(res.data.data.toutes_sous_categories[0].slug)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
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
                                    setSlugOne(data.slug)
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
                    <span className="cursor me-2">Voir</span>
                    <span className="cursor me-2">Modifiers</span>
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
                            <span className="input-group-text">SearchIcon</span>
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
                    data-bs-target="#produit"
                >
                    Ajouter
                </button>
            </div>
        </>
    );
};
