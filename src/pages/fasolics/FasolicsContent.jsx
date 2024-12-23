import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import request from "../../services/request";
import endPoint from "../../services/endPoint";
import rech from "../../assets/images/recherche.png";
import { RightIcon } from "../../icons/RightIcon";
import { DownIcon } from "../../icons/DownIcon";

export const FasolicsContent = ({ }) => {
    const { slugOne, slugTwo } = useParams();
    const [data, setData] = useState({});
    const navigate = useNavigate()
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
        request
            .get(endPoint.categories + "/" + slugOne)
            .then((res) => {
                //console.log(res.data)
                setData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changerView = (e, slug) => {
        e.preventDefault();
        if (slugTwo === slug) {
            navigate("/fasolics/" + slugOne);
        } else {
            navigate("/fasolics/" + slugOne + "/" + slug);
        }

    };



    return (
        <>
            <h1 className="text-success">{lang === "en" ? data.titre_en : data.titre}</h1>
            {
                slugTwo === undefined && <div className="my-4">
                    {
                        lang === "en" ? `
                    The acronym FasoLics stands for Burkina Faso Network for
                    the Study of Learning, Innovation & Competence Building Systems in English.
                    In French, it means the Burkinabe Network for Research on Learning,
                    Innovation and Skills Development Systems. Created in 2019 under the initiative of Professor Natéwindé Sawadogo, the network brings together
                    teacher-researchers and researchers from various disciplines in the human and social sciences interested in the
                    issue of innovation in relation to public policies in Burkina Faso. In 2023, the Network acquired the status of Chapter of the African Network for Research on Learning, Innovation and
                    Skills Development Systems, abbreviated to Africalics. It is recognized by Thomas SANKARA University as a platform for training,
                    research and political dialogue on public policies.
                    ` : `
                    Le sigle FasoLics signifie en anglais, Burkina Faso Network for
                the Study of Learning, Innovation & Competence Building Systems.
                En français, il signifie le Réseau burkinabè pour la recherche
                sur les Systèmes  de développement de l’apprentissage,
                l’innovation et des Compétences. Créé en 2019 sous l’initiative
                du Professeur Natéwindé Sawadogo, le réseau regroupe des
                enseignants chercheurs et des chercheurs de diverses disciplines
                des sciences humaines et sociales s’intéressant à la
                problématique de l’innovation en lien avec les politiques
                publiques au Burkina Faso. En 2023, le Réseau a acquis le status
                de Chapitre du Réseau Africain pour la recherche sur les
                systèmes de développement de l’apprentissage, de l’innovation et
                des compétences en abrégé Africalics. Il est reconnu par
                l’Université Thomas SANKARA comme une plateforme de formation,
                de recherche et de dialogue politique sur les politiques
                publiques.
                    `
                    }

                </div>
            }


            {data.toutes_sous_categories?.map((data, idx) => {
                return (
                    <div className="mt-4" key={idx} onClick={e => changerView(e, data.slug)}>
                        <div className="d-flex bg-green p-2">
                            <span className="text-white fw-bold">
                                {lang === "en" ? data.titre_en : data.titre}
                            </span>

                            {slugTwo !== data.slug ? (
                                <>
                                    <span className="text-white ms-auto">
                                        <RightIcon />
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="text-white ms-auto">
                                        <DownIcon />
                                    </span>
                                </>
                            )}
                        </div>
                        {slugTwo === data.slug && (
                            <div className="bg-green-light p-2">
                                <div dangerouslySetInnerHTML={{ __html: lang === "en" ? data.contenu_en : data.contenu }} />
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
};
