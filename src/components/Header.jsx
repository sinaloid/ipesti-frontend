import { NavLink } from "react-router-dom";
import logo from "../assets/images/header.png";
import { FRIcon } from "../icons/FRIcon";
import { ModeIcon } from "../icons/ModeIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { UserIcon } from "../icons/UserIcon";
import { DropDown } from "./DropDown";
import { LinkSelectedIcon } from "../icons/LinkSelectedIcon";
import { useEffect, useState } from "react";
import request from "../services/request";
import endPoint from "../services/endPoint";

export const Header = () => {
    const url = window.location.pathname;
    const [rubriques, setRubriques] = useState([])
    const [lang, setLang] = useState("")
    const [search, setSearch] = useState("")

    useEffect(() => {
        console.log(url);
        const content = url.includes("ipesti");
        console.log(content);
        get()
        const langSelected = localStorage.getItem("lang")
        setLang(langSelected)
    }, []);

    const get = () => {
        request
            .get(endPoint.categories)
            .then((res) => {
                //console.log(res.data);
                setRubriques(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <header className="row py-3 border-bottom px-0 d-none d-md-flex">
                <div className="col-12 col-md-10 mx-auto d-flex flex-wrap justify-content-center">
                    <a
                        href="/"
                        className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-uppercase text-white text-decoration-none"
                    >
                        <img className="d-md-inline" height={"80px"} src={logo} alt="logo ipesti" />
                    </a>
                    <div className="col-12 col-lg-auto ms-auto d-flex flex-wrap mb-3 mb-lg-0 pt-5">
                        <div className="dropdown text-center mx-3">
                            <button
                                className="btn h-44 border dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span
                                    className="me-2"
                                    style={{ marginTop: "-20px" }}
                                >
                                    <UserIcon />
                                </span>
                                <span className="pt-2">
                                    
                                    {lang === "en" ? "I am" : "Je suis"}
                                </span>
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        {lang === "en" ? "Visitor" : "Visiteur"}
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        {lang === "en" ? "Student" : "étudiant"}
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        {lang === "en" ? "Other" : "Autre"}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="input-group mx-3 input-width-165">
                            <input
                                type="text"
                                className="form-control border-end-0"
                                placeholder={lang === "en" ? "Search" : "Recherche"}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <span
                                className="input-group-text bg-white border-start-0 h-44"
                                id="basic-addon2"
                                onClick={e => {
                                    e.preventDefault();
                                    window.location.href = `/recherche-donnees/${search}`
                                }}
                            >
                                <SearchIcon />
                            </span>
                        </div>
                        <div className="mx-3 d-inline-block d-flex align-items-center">
                            <div className="fw-bold">
                                <span className="fs-20">A+/</span>
                                <span className="fs-14">A-</span>
                            </div>
                            <span className="ms-3 me-5">
                                <ModeIcon />
                            </span>
                            <div className="">
                                <span className="ms-3 me-1">
                                    <FRIcon />
                                </span>
                                <div className="btn-group dropdown">
                                    <button
                                        className="btn btn-primary1 dropdown-toggle border-0 px-0 pxx-2"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="true"
                                        aria-expanded="false"
                                    >
                                        <span className="d-inline-block px-1 text-uppercase">
                                            {localStorage.getItem("lang") || "FR"}
                                        </span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    localStorage.setItem('lang', 'fr');
                                                    window.location.reload();
                                                }}
                                            >
                                                FR
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    localStorage.setItem('lang', 'en');
                                                    window.location.reload();
                                                }}
                                            >
                                                EN
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div
                className={`row border-bottom  bg-black ${url.includes("fasolics")
                    ? "border-color-green"
                    : "border-color"
                    }`}
            >
                <div className="col-12 col-md-10 mx-auto d-flex flex-wrap">
                    <nav
                        className="navbar navbar-dark navbar-expand-md navbar-expand-xxl1 w-100 m-0 p-0"
                        aria-label="Seventh navbar example"
                    >
                        <div className="container-fluid px-0">
                            <div onClick={() => window.location.href = "/"} className="d-md-none">
                                <LogoMobileHeader />
                            </div>
                            <div className="ms-auto me-3 my-2 d-md-none" onClick={() => window.location.href = "/recherche-donnees"}>
                                <SearchIcon />
                            </div>
                            <button
                                className="navbar-toggler custom-toggler border-0 my-2"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarsExampleXxl"
                                aria-controls="navbarsExampleXxl"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="d-md-none">
                                <span className=" me-1">
                                    <FRIcon />
                                </span>
                                <div className="btn-group custom-dropdown-mobile">
                                    <button
                                        className="btn btn-sm btn-primary1 dropdown-toggle border-0 px-0 pxx-2"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="true"
                                        aria-expanded="false"
                                    >
                                        <span className="d-inline-block px-1 text-uppercase text-white" style={{ fontSize: "12px" }}>
                                            {localStorage.getItem("lang") || "FR"}
                                        </span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a
                                                className="dropdown-item "
                                                href="#"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    localStorage.setItem('lang', 'fr');
                                                    window.location.reload();
                                                }}
                                            >
                                                FR
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    localStorage.setItem('lang', 'en');
                                                    window.location.reload();
                                                }}
                                            >
                                                EN
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div
                                className="collapse navbar-collapse"
                                id="navbarsExampleXxl"
                            >
                                <ul className="navbar-nav me-auto py-2">
                                    <li className="nav-item">
                                        <NavLink
                                            to="/"
                                            className={`nav-link text-uppercase text-white px-2 active ${url === "/" && "text-primary"
                                                }`}
                                        >
                                            {
                                                lang === "en" ? "Home" : "Accueil"
                                            }
                                            <span className="d-flex arrow-up w-100 px-2">
                                                <span className="selected mx-auto">
                                                    <LinkSelectedIcon />
                                                </span>
                                            </span>
                                        </NavLink>
                                    </li>
                                    {
                                        rubriques.map((data, idx) => {

                                            if (data.slug === "fasolics") {
                                                return
                                            }
                                            return <li className="nav-item" key={idx + "-header"}>
                                                <div className="dropdown position-relative">
                                                    <NavLink
                                                        href="#"
                                                        role="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        className={`dropdown-toggle nav-link text-uppercase text-white px-2 active ${url.includes(data.slug) &&
                                                            "text-primary"
                                                            }`}
                                                    >
                                                        <span>{lang === "en" ? data.titre_en : data.titre}</span>

                                                        <span className="d-flex arrow-up w-100 px-2 d-none d-md-block">
                                                            <span className="selected mx-auto">
                                                                <LinkSelectedIcon />
                                                            </span>
                                                        </span>
                                                    </NavLink>
                                                    <DropDown
                                                        menu={data.toutes_sous_categories}
                                                        link={data.slug}
                                                    />
                                                </div>
                                            </li>
                                        })
                                    }

                                </ul>
                                <ul
                                    className={`nav py-2 ${url.includes("fasolics") &&
                                        "bg-green no-hover"
                                        }`}
                                >
                                    <li className="nav-item ">
                                        <NavLink
                                            to={"/fasolics/a-propos"}
                                            className="nav-link text-uppercase text-white px-2"
                                        >
                                            fasolics
                                        </NavLink>
                                    </li>
                                </ul>
                                {/*** 
                                        <ul className="nav py-2">
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/login"
                                                    className="nav-link text-uppercase text-white px-2 active"
                                                >
                                                    connexion
                                                    <span className="d-flex arrow-up w-100 px-2">
                                                        <span className="selected mx-auto">
                                                            <LinkSelectedIcon />
                                                        </span>
                                                    </span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                     */}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};


const LogoMobileHeader = () => {
    return (
        <svg width="67" height="41" viewBox="0 0 67 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.6389 4.16942e-05C22.4697 -0.0109591 24.6924 2.1562 24.7366 4.9834C24.7808 7.6786 22.5029 9.98877 19.7716 10.0218C17.0292 10.0548 14.6739 7.74461 14.6739 5.01641C14.6628 2.27721 16.9076 0.0110425 19.6389 4.16942e-05Z" fill="#F4BF2E" />
            <path d="M20.6787 19.1635C20.6787 19.1635 20.8888 14.8292 26.4399 11.4189V14.5652C26.4399 14.5652 21.7734 16.9413 20.6787 19.1635Z" fill="#F4BF2E" />
            <path d="M20.6787 22.0017C20.6787 22.0017 22.3927 15.2912 31.991 13.8501V17.6674C31.991 17.6674 27.3798 16.3253 20.6787 22.0017Z" fill="#2BB460" />
            <path d="M18.7104 19.1635C18.7104 19.1635 18.5003 14.8292 12.9492 11.4189V14.5652C12.9492 14.5652 17.6267 16.9413 18.7104 19.1635Z" fill="#F4BF2E" />
            <path d="M18.7097 22.0017C18.7097 22.0017 16.9957 15.2912 7.39746 13.8501V17.6674C7.39746 17.6674 12.0197 16.3253 18.7097 22.0017Z" fill="#E02C30" />
            <g opacity="0.7">
                <path d="M0 40.5487V24.3115H3.67123V40.5487H0Z" fill="white" />
                <path d="M19.108 26.8861C18.5773 26.039 17.8143 25.3899 16.8301 24.9279C15.8349 24.4659 14.6517 24.2349 13.2584 24.2349H7.28711V40.6041H10.9583V35.9507H13.2584C14.6406 35.9507 15.8349 35.7197 16.8301 35.2577C17.8253 34.7956 18.5773 34.1466 19.108 33.2885C19.6388 32.4305 19.9042 31.4294 19.9042 30.2743V29.9223C19.9042 28.7452 19.6388 27.7331 19.108 26.8861ZM15.857 31.5284C15.6358 31.9354 15.3152 32.2544 14.906 32.4745C14.4969 32.6945 14.0103 32.8045 13.4353 32.8045H10.9583V27.4031H13.4353C13.9993 27.4031 14.4858 27.5131 14.906 27.7221C15.3152 27.9421 15.6358 28.2502 15.857 28.6572C16.0782 29.0642 16.1887 29.5482 16.1887 30.1203C16.1887 30.6483 16.0782 31.1214 15.857 31.5284Z" fill="white" />
                <path d="M32.378 37.5235V40.5487H22.1162V24.3115H32.2232V27.3367H25.6879V30.78H31.8693V33.8052H25.6879V37.5235H32.378Z" fill="white" />
                <path d="M40.8696 40.9999C39.3989 40.9999 38.1494 40.7689 37.132 40.2958C36.1147 39.8338 35.3517 39.1958 34.832 38.3817C34.3123 37.5786 34.0469 36.6436 34.0469 35.5875H37.6075C37.6075 36.0055 37.7181 36.3906 37.9503 36.7426C38.1825 37.0946 38.5364 37.3806 39.0119 37.6006C39.4874 37.8207 40.1066 37.9197 40.8696 37.9197C41.5552 37.9197 42.1302 37.8317 42.5947 37.6556C43.0591 37.4796 43.4019 37.2266 43.6452 36.9076C43.8884 36.5886 43.999 36.2255 43.999 35.8075C43.999 35.2905 43.7779 34.8724 43.3245 34.5754C42.8822 34.2674 42.1523 34.0804 41.1571 33.9814L39.9297 33.8714C38.3042 33.7394 37.0104 33.2333 36.0373 32.3533C35.0642 31.4732 34.5887 30.3181 34.5887 28.888C34.5887 27.8539 34.843 26.9519 35.3407 26.1928C35.8383 25.4338 36.5349 24.8507 37.4306 24.4437C38.3263 24.0367 39.3879 23.8276 40.6042 23.8276C41.887 23.8276 42.9817 24.0477 43.8995 24.4877C44.8173 24.9277 45.525 25.5438 46.0116 26.3358C46.4981 27.1279 46.7524 28.0629 46.7524 29.13H43.1697C43.1697 28.734 43.0701 28.36 42.8822 28.0299C42.6831 27.6999 42.4067 27.4249 42.0196 27.2159C41.6437 27.0069 41.1682 26.9079 40.6042 26.9079C40.0624 26.9079 39.6201 26.9959 39.2552 27.1719C38.8902 27.3479 38.6138 27.5899 38.4369 27.8979C38.2599 28.206 38.1715 28.536 38.1715 28.888C38.1715 29.35 38.3374 29.7461 38.658 30.0871C38.9898 30.4281 39.5206 30.6261 40.2725 30.6921L41.522 30.8021C42.7163 30.9012 43.7668 31.1652 44.6735 31.5722C45.5803 31.9792 46.2991 32.5403 46.8077 33.2443C47.3275 33.9484 47.5818 34.8064 47.5818 35.8185C47.5818 36.8526 47.3053 37.7657 46.7635 38.5467C46.2217 39.3278 45.4476 39.9328 44.4524 40.3618C43.4572 40.7909 42.2629 40.9999 40.8696 40.9999Z" fill="white" />
                <path d="M61.0733 24.3115V27.4908H56.4621V40.5487H52.7909V27.4908H48.2129V24.3115H61.0733Z" fill="white" />
                <path d="M63.3291 40.5487V24.3115H67.0003V40.5487H63.3291Z" fill="white" />
            </g>
        </svg>

    );
}