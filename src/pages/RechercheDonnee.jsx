import React, { useState, useEffect } from "react";
import request, { URL } from "../services/request";
import endPoint from "../services/endPoint";
import { Page } from "../components/Page";
import { Banier } from "../components/Banier";
import logo from "../assets/images/logo.png";
import { useParams } from "react-router-dom";
import { SearchIcon } from "../icons/SearchIcon";

const RechercheDonnee = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [actualites, setActualites] = useState([]);
    const { value } = useParams();

    const lang = localStorage.getItem("lang") || "FR"

    useEffect(() => {
        get();
        getActualites();

    }, []);

    const getActualites = () => {
        request
            .get(endPoint.categories + "/actualites")
            .then((res) => {
                console.log(res.data.data);
                if (res.data.data.toutes_sous_categories.length < 4) {
                    res.data.data.toutes_sous_categories = [
                        ...res.data.data.toutes_sous_categories,
                        ...res.data.data.toutes_sous_categories,
                        ...res.data.data.toutes_sous_categories,
                        ...res.data.data.toutes_sous_categories,
                    ];
                }
                setActualites(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const get = () => {
        request
            .get(endPoint.categories)
            .then((res) => {
                /*const flattenedData = res.data.data.flatMap(flattenPosts);
                console.log(res.data.data)

                console.log(flattenedData);*/

                const allPostsWithFullSlugs = groupPostsWithSlugs(res.data.data);
                //console.log(allPostsWithFullSlugs);

                setPosts(allPostsWithFullSlugs);
                if (value) {
                    //setSearchQuery(value)
                    handleSearch({ target: { value } }, allPostsWithFullSlugs)
                    //console.log({target: {value}})
                }
            })
            .catch((error) => console.log(error));
    };

    const flattenAndConcatSlugs = (post, parentSlug = '', baseSlug = '', maxDepth = 0) => {
        // Calculer le slug actuel avec la limite de profondeur
        const currentSlugParts = parentSlug.split('/').filter(Boolean);
        const currentSlug =
            currentSlugParts.length < maxDepth
                ? `${parentSlug ? `${parentSlug}/` : ''}${post.slug}`
                : parentSlug;

        // Ajouter l'objet avec son `fullSlug`
        const result = [{ ...post, fullSlug: currentSlug }];

        // Si le parent a des sous-catégories et qu'on n'a pas atteint la profondeur max, traiter récursivement
        if (
            post.toutes_sous_categories &&
            post.toutes_sous_categories.length > 0 &&
            currentSlugParts.length < maxDepth
        ) {
            post.toutes_sous_categories.forEach((subCategory) => {
                result.push(...flattenAndConcatSlugs(subCategory, currentSlug, baseSlug, maxDepth));
            });
        }

        return result;
    };

    const groupPostsWithSlugs = (posts) => {
        return posts.flatMap((post) => {
            // Déterminer la profondeur maximale en fonction du slug principal
            const maxDepth = (() => {
                if (post.slug.startsWith('ipesti')) return 3; // Limite à 3 niveaux pour `ipesti`
                if (
                    ['la-recherche', 'formations', 'publications', 'actualites-evenements', 'expertise-conseil'].includes(post.slug)
                )
                    return 2; // Limite à 2 niveaux pour les autres slugs spécifiés
                return Infinity; // Pas de limite pour les autres
            })();

            // Appeler la fonction de flatten avec les paramètres initiaux
            return flattenAndConcatSlugs(post, '', post.slug, maxDepth);
        });
    };




    const handleSearch = (e, datas = []) => {
        const query = e.target.value.toLowerCase();
        console.log(query)
        setSearchQuery(query);
        console.log(posts)
        const postTab = datas.length > 0 ? datas : posts;
        if (query) {
            const filtered = postTab.filter((post) =>
                ((post.titre && post.titre.toLowerCase().includes(query)) ||
                    (post.titre_en && post.titre_en.toLowerCase().includes(query)) ||
                    (post.fullSlug && post.fullSlug.toLowerCase().includes(query)) ||
                    (post.htmlOne && post.htmlOne.toLowerCase().includes(query)) ||
                    (post.htmlOne_en && post.htmlOne_en.toLowerCase().includes(query)) ||
                    (post.contenu && post.contenu.toLowerCase().includes(query))) && ((post.contenu !== null || post.htmlOne !== null))
            );
            setFilteredPosts(filtered);
            console.log(filtered)
        } else {
            setFilteredPosts([]);
        }
    };

    const truncateText = (text, maxLength = 100) => {
        return text?.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <Page>
            <div className="container mt-5">
                {/* Logo */}
                <div className="text-center mb-4">
                    <img
                        src={logo}
                        alt="Logo"
                        className="img-fluid"
                        style={{ maxWidth: "150px" }}
                    />
                </div>

                {/* Barre de recherche */}
                <div className="w-50 mx-auto text-center mb-5 d-none d-md-block">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control border-end-0 rounded-end-0"
                            placeholder={lang === "en" ? "Search in titles or contents" : "Rechercher dans les titres ou contenus..."}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <span
                            className="input-group-text bg-white px-4"
                            id="basic-addon2"
                        >
                            <SearchIcon />
                        </span>
                    </div>
                </div>

                <div className=" mx-auto text-center mb-5 d-md-none">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control border-end-0 rounded-end-0"
                            placeholder={lang === "en" ? "Search in titles or contents" : "Rechercher dans les titres ou contenus..."}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <span
                            className="input-group-text bg-white px-4"
                            id="basic-addon2"
                        >
                            <SearchIcon />
                        </span>
                    </div>
                </div>

                {/* Résultats */}
                <div className="row">
                    <div className="col-12 col-md-8 mx-auto">
                        {searchQuery && (
                            <div className="mb-3">
                                <h5>
                                    {filteredPosts.length}{" "}
                                    {filteredPosts.length === 1 ? "résultat trouvé" : "résultats trouvés"}
                                </h5>
                            </div>
                        )}

                        {filteredPosts.length > 0 ? (
                            <ul className="list-group">
                                {filteredPosts.map((post) => {

                                    return <li key={post.id} className="list-group-item d-flex align-items-start mb-4 border rounded">
                                        <img
                                            src={post.image ? URL + post.image : logo}
                                            alt={post.titre}
                                            className="rounded-circle me-3"
                                            style={{ width: "48px", height: "48px", objectFit: "cover" }}
                                        />
                                        <div>
                                            <a
                                                href={"/" + post.fullSlug || "#"}
                                                className="fw-bold text-decoration-none text-primary"
                                            >
                                                {post.titre || "Titre non défini"}
                                            </a>
                                            <p className="text-muted mb-0 text-black fs-14">
                                                <div style={{ fontSize: '14 px ! importante' }} dangerouslySetInnerHTML={{ __html: truncateText(post.htmlOne, 350) }} />
                                            </p>

                                            <p className="text-muted mb-0 text-black fs-14">
                                                <div dangerouslySetInnerHTML={{ __html: truncateText(post.contenu, 300) }} />
                                            </p>

                                        </div>
                                    </li>
                                })}
                            </ul>
                        ) : (
                            searchQuery && <p className="text-center text-muted">Aucun résultat trouvé</p>
                        )}
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default RechercheDonnee;
