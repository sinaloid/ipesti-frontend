import { useEffect, useRef, useState } from "react";
import endPoint from "../../../services/endPoint";
import request, { URL } from "../../../services/request";
import { Input } from "../../../components/Input";
import { useFormik } from "formik";
import { pagination } from "../../../services/function";
import { useParams } from "react-router-dom";
import { PageList } from "./detailOfPage/PageList";
import { PageCategorie } from "./detailOfPage/PageCategorie";

const initData = {
    nom: "",
    image: "",
    description: "",
};
export const DetailOfPage = () => {
    const [view, setView] = useState("pages");
    return (
        <>
            {view === "pages" && <PageList setView={setView} />}
            {view === "categories" && <PageCategorie setView={setView} />}
        </>
    );
};
