import { useEffect, useState } from "react";
import prof from "../../assets/images/prof.png";
import { useNavigate, useParams } from "react-router-dom";

export const Equipe = ({ data }) => {
    const [viewContent, setViewContent] = useState(false);
    const [idView, setIdView] = useState(0);
    const equipe = [
        "Directeur",
        "Directeur Adjoint",
        "Chargé de programmes",
        "Assistante administrative",
    ];
    const { slugTwo } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(data);
        if (
            slugTwo === undefined &&
            data.children !== undefined &&
            data.children?.length !== 0
        ) {
            changerView(data.slug + "/" + data?.children[0]?.slug);
            setIdView(0);
        }
    }, [data]);

    const changerView = (slug) => {
        navigate("/ipesti/" + slug);
    };
    return (
        <div className="col-12 col-md-8">
            <h1 className="text-primary mb-4 text-uppercase">
                Equipe de l’IPESTI
            </h1>
            <div className="d-flex mb-4 border-bottom">
                {data.children?.map((item, idx) => {
                    return (
                        <div
                            key={"scat" + idx}
                            className={`cursor border-bottom me-4 text-90 ${
                                item.slug === slugTwo
                                    ? "border-color fw-bold"
                                    : "text-opacity-70"
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                changerView(data.slug + "/" + item.slug);
                                setIdView(idx);
                            }}
                        >
                            {item.label}
                        </div>
                    );
                })}
            </div>

            {!viewContent ? (
                <>
                    {slugTwo === "equipes-de-direction-administrative" && (
                        <>
                            <div className="mb-4 fs-18 text-primary fw-bold">
                                {data?.children &&
                                    data.children?.length !== 0 &&
                                    data.children[idView].label}
                            </div>
                            <div className="row row-cols-2 g-4 mb-4">
                                {equipe.map((data, idx) => {
                                    return (
                                        <div
                                            className="col"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setViewContent(!viewContent);
                                            }}
                                        >
                                            <div className="d-flex">
                                                <img
                                                    className="rounded-3"
                                                    width={"150px"}
                                                    src={prof}
                                                />
                                                <div>
                                                    <div>
                                                        {" "}
                                                        <span className="fw-bold">
                                                            Poste
                                                        </span>{" "}
                                                        : {data}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className="mb-4">
                    <div
                        className="mb-4"
                        onClick={(e) => {
                            e.preventDefault();
                            setViewContent(!viewContent);
                        }}
                    >
                        <div className="d-flex">
                            <img
                                className="rounded-3"
                                width={"150px"}
                                src={prof}
                            />
                            <div>
                                <div className="fw-bold text-primary fs-18">
                                    Natéwindé Sawadogo
                                </div>
                                <div>
                                    {" "}
                                    <span className="fw-bold">Poste</span> :
                                    Enseignant chercheur
                                </div>
                                <div>
                                    <span className="fw-bold">
                                        Institution de rattachement{" "}
                                    </span>
                                    : Université Thomas SANKARA
                                </div>
                                <div>
                                    <span className="fw-bold">
                                        Axe de recherche
                                    </span>{" "}
                                    : Science, Technologie et Sociétés
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>
                            Natéwindé Sawadogo est Maître de Conférences en
                            sociologie, titulaire d’un PhD en Science,
                            Technologie et Société (STS) de l’Université de
                            Nottingham au Royaume-Uni. Il a rejoint l’Université
                            Thomas SANKARA en 2015. En 2016, il initie un
                            Certificat en histoire des sciences et des
                            technologies qui, sept ans après a donné naissance à
                            l’IPESTI. Coordonnateur du montage du projet de
                            Centre d’Excellence d’Etudes, de Formation et de
                            Recherche en Gestion des Risques Sociaux
                            (CEA-CEFORGRIS), dont il est actuellement le
                            Coordonnateur Adjoint, il a participé à la rédaction
                            du chapitre sur le l’Afrique de l’Ouest du Rapport
                            2021 de l’UNESCO sur la Science.
                        </p>
                        <p>
                            <span>Recherches en cours</span>
                            <ul>
                                <li>
                                    Formation du champ académique au Burkina
                                    Faso
                                </li>
                                <li>
                                    L’Etat l’enseignement supérieur, la science
                                    et l’innovation
                                </li>
                                <li>
                                    Les données de l’enseignement supérieur, de
                                    la recherche et de l’innovation
                                </li>
                                <li>
                                    One Health et innovation dans les systèmes
                                    de santé
                                </li>
                                <li>Risques et sociétés</li>
                            </ul>
                        </p>
                    </div>
                    <div>
                        <button className="btn border-secondary">
                            Voir CV
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
