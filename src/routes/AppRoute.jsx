import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { AppLink } from "./AppLink";
import { Content } from "../pages/Content";
import { Ipesti } from "../pages/Ipesti";
import { Formation } from "../pages/Formation";
import { Publication } from "../pages/Publication";
import { ActuEven } from "../pages/ActuEven";
import { Fasolics } from "../pages/Fasolics";
import Dashboard from "../pages/Dashboard";
import { Categorie } from "../pages/admin/Categorie";
import { Page } from "../pages/admin/Page";
import { MonCompte } from "../pages/admin/MonCompte";
import { Utilisateur } from "../pages/admin/Utilisateur";
import { Newsletter } from "../pages/admin/Newsletter";
import { Login } from "../pages/Login";
import { Infos } from "../pages/admin/Infos";
import { ListCategorie } from "../pages/admin/categorie/ListCategorie";
import { DetailCategorie } from "../pages/admin/categorie/DetailCategorie";
import { DetailOfPage } from "../pages/admin/categorie/DetailOfPage";
import { DashActualite } from "../pages/admin/DashActualite";
import { DashPublication } from "../pages/admin/DashPublication";
import { DashFormation } from "../pages/admin/DashFormation";
import { DashRecherche } from "../pages/admin/DashRecherche";
import { DashIpesti } from "../pages/admin/DashIpesti";
import { DashFasolics } from "../pages/admin/DashFasolics";
import { Recherche } from "../pages/Recherche";
import { Expertise } from "../pages/Expertise";
import RechercheDonnee from "../pages/RechercheDonnee";

const AppRoute = ({ type }) => {
    if (type === "app") {
        return (
            <Routes>
                <Route path={AppLink.home} element={<Home />} />
                <Route path={AppLink.rechercheDonnees+"/:value?"} element={<RechercheDonnee />} />
                <Route path={AppLink.ipesti} element={<Ipesti />} />
                <Route path={AppLink.recherche} element={<Recherche />} />
                <Route path={AppLink.formation} element={<Formation />} />
                <Route path={AppLink.publication} element={<Publication />} />
                <Route path={AppLink.expertise} element={<Expertise />} />
                <Route path={AppLink.actuEven} element={<ActuEven />} />
                <Route path={AppLink.fasolics} element={<Fasolics />} />
                <Route path={AppLink.login} element={<Login />} />
                <Route path={AppLink.dashboard} element={<Dashboard />} />
            </Routes>
        );
    }

    if (type === "tdb") {
        return (
            <Routes>
                <Route
                    path={AppLink.categories + "/*"}
                    element={<Categorie />}
                />
                <Route path={AppLink.pages} element={<Page />} />
                <Route path={AppLink.utilisateurs} element={<Utilisateur />} />
                <Route path={AppLink.newsletters} element={<Newsletter />} />

                <Route path={AppLink.actualites_dashboard} element={<DashActualite />} />
                <Route path={AppLink.publications_dashboard} element={<DashPublication />} />
                <Route path={AppLink.formations_dashboard} element={<DashFormation />} />
                <Route path={AppLink.recherches_dashboard} element={<DashRecherche />} />
                <Route path={AppLink.ipesti_dashboard} element={<DashIpesti />} />
                <Route path={AppLink.ipesti_dashboard+"/:slug?"} element={<DetailCategorie />} />
                <Route path={AppLink.ipesti_dashboard+"/:slug?/:slug?"} element={<DetailCategorie />} />
                <Route path={AppLink.fasolics_dashboard} element={<DashIpesti slug="fasolics" />} />
                <Route path={AppLink.compte} element={<MonCompte />} />
            </Routes>
        );
    }

    if (type === "categorie") {
        return (
            <Routes>
                <Route path={AppLink.home} element={<ListCategorie />} />
                <Route path={AppLink.detail} element={<DetailCategorie />} />
                <Route path={AppLink.detail+"/:slug"} element={<DetailCategorie />} />
                <Route path={AppLink.detail+"/:slug"+"/:slug"} element={<DetailCategorie />} />
                <Route path={AppLink.detail+"/:slug"+"/:slug"+"/:slug"} element={<DetailCategorie />} />
                <Route path={AppLink.detail+"/:slug"+"/:slug"+"/:slug"+"/:slug"} element={<DetailCategorie />} />
                <Route path={AppLink.detailOfPage} element={<DetailOfPage />} />

            </Routes>
        );
    }
    
};

export default AppRoute;
