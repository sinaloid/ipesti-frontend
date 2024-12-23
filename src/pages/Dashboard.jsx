import { NavLink, useNavigate } from "react-router-dom";

//import { BackIcon } from "../assets/icons/BackIcon";

//import { DeconnectionIcon } from "../assets/icons/DeconnectionIcon";

//import { MonCompteIcon } from "../assets/icons/MonCompteIcon";

import AppRoute from "../routes/AppRoute";
import { deleteUser } from "../services/storage";
import { useContext, useEffect, useState } from "react";
import { AppContext, initialUser } from "../services/context";
import request, { URL } from "../services/request";
import { AppLink } from "../routes/AppLink";
import logo from "../assets/images/footer.png";
import endPoint from "../services/endPoint";

const Dashboard = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState({
        url: "",
        slug: "",
    });
    const navigate = useNavigate();
    useEffect(() => {
        isAuth();
    }, [user]);

    const isAuth = () => {
        if (user.isAuth == false || user.token == null || user.token == "") {
            console.log(`connexion échoué, isAuth`);
            console.log(user);

            return navigate("/");
        } else {
            console.log("isAuth true");
            get();
        }
    };
    const get = () => {
        request
            .get(endPoint.categories)
            .then((res) => {
                console.log(res.data);
                setCategories(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deconnect = () => {
        deleteUser();
        onUserChange(initialUser);
    };

    return (
        <>
            <header
                class="navbar sticky-top bg-dark1 w-100 d-md-none flex-md-nowrap p-0 shadow1"
                data-bs-theme="dark"
                //style=""
            >
                <a
                    class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white1"
                    href="#"
                >
                    IPESTI
                </a>

                <ul class="navbar-nav flex-row d-md-none">
                    <li class="nav-item text-nowrap">
                        <button
                            class="nav-link px-3 text-black"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#sidebarMenu"
                            aria-controls="sidebarMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            "MenuIcon"
                        </button>
                    </li>
                </ul>

                <div id="navbarSearch" class="navbar-search w-100 collapse">
                    <input
                        class="form-control w-100 rounded-0 border-0"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </div>
            </header>

            <div class="row v-100-h">
                <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary1 bg-black">
                    <div
                        class="offcanvas-md offcanvas-end bg-body-tertiary1 bg-black h-100"
                        tabindex="-1"
                        id="sidebarMenu"
                        aria-labelledby="sidebarMenuLabel"
                    >
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="sidebarMenuLabel">
                                IPESTI
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="offcanvas"
                                data-bs-target="#sidebarMenu"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto h-100">
                            <div className="d-flex align-items-center mb-5">
                                <div className="mx-4">
                                    <a href="/">
                                        <img
                                            width={"100px"}
                                            src={logo}
                                            alt="logo kelkou"
                                        />
                                    </a>{" "}
                                    <br />
                                    <span className="fw-bold text-white">
                                        Administration
                                    </span>
                                </div>
                            </div>
                            <ul class="nav flex-column bg-gray mx-2 rounded-3">
                                {categories.map((data, idx) => {
                                    return (
                                        <li class="nav-item">
                                            <NavLink
                                                className={({ isActive }) =>
                                                    `nav-link d-flex align-items-center text-white gap-2 text-uppercase  ${
                                                        isActive &&
                                                        "dash-active text-white rounded-3"
                                                    }`
                                                }
                                                to={data.slug}
                                            >
                                                <i class="bi bi-house"></i>
                                                {data.titre}
                                            </NavLink>
                                        </li>
                                    );
                                })}
                                <li class="nav-item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            `nav-link d-flex align-items-center text-white gap-2 text-uppercase   ${
                                                isActive &&
                                                "dash-active text-white rounded-3"
                                            }`
                                        }
                                        to={AppLink.categories}
                                    >
                                        <i class="bi bi-house"></i>
                                        Catégories
                                    </NavLink>
                                </li>

                                <li class="nav-item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            `nav-link d-flex align-items-center text-white gap-2 text-uppercase  ${
                                                isActive &&
                                                "dash-active text-white rounded-3"
                                            }`
                                        }
                                        to={AppLink.utilisateurs}
                                    >
                                        <i class="bi bi-house"></i>
                                        Utilisateurs
                                    </NavLink>
                                </li>
                            </ul>
                            <ul class="nav flex-column mb-auto bg-gray mx-2 rounded-3 h-100">
                                <li class="nav-item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            `nav-link d-flex align-items-center text-white gap-2 text-uppercase  ${
                                                isActive &&
                                                "dash-active text-white rounded-3"
                                            }`
                                        }
                                        to={AppLink.newsletters}
                                    >
                                        <i class="bi bi-chat-right-dots"></i>
                                        Newsletters
                                    </NavLink>
                                </li>
                                <li class="nav-item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            `nav-link d-flex align-items-center text-white gap-2 text-uppercase  ${
                                                isActive &&
                                                "dash-active text-white rounded-3"
                                            }`
                                        }
                                        to={AppLink.compte}
                                    >
                                        <i class="bi bi-chat-right-dots"></i>
                                        Mon compte
                                    </NavLink>
                                </li>
                                <div className="mb-2"></div>

                                <li class="nav-item border border-color rounded-3">
                                    <span
                                        class="nav-link d-flex align-items-center px-4 fw-bold gap-2 text-uppercase  text-white"
                                        onClick={deconnect}
                                    >
                                        {/**<DeconnectionIcon /> */}
                                        Déconnection
                                    </span>
                                </li>
                                <li class="nav-item bg-danger rounded-3"></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                        <span>retour</span>
                        <div class="d-flex align-items-center mb-2 mb-md-0">
                            <div className="text-end me-2">
                                <span className="fw-bold">Jeanne SAWADOGO</span>{" "}
                                <br />
                                <span className="text-muted">#jeanne_saw</span>
                            </div>
                            <div className="text-end d-inline-block rounded-circle p-1 border border-5">
                                <img
                                    className="rounded-circle"
                                    width={"100px"}
                                    src={URL + "users/profile/" + user.photo}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <AppRoute type={"tdb"} />
                </main>
            </div>
        </>
    );
};

export default Dashboard;
