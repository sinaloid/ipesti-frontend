import { useEffect, useState } from "react";
import img from "../assets/images/equipe.jpg";
import { Container } from "./Container";
import { URL } from "../services/request";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../services/service";
export const Banier = ({ datas = {} }) => {
    const [seletedData, setSelectedData] = useState([])
    const [index, setIndex] = useState(0)
    const navigate = useNavigate()
    const lang = localStorage.getItem("lang") || "FR"
    useEffect(() => {
        if (datas?.toutes_sous_categories) {
            setSelectedData(datas?.toutes_sous_categories)
        }

    }, [datas])

    const detail = (e, slug) => {
        e.preventDefault()
        navigate("/actualites-evenements/actualites" + "/" + slug)
    }

    const timeoutId = setTimeout(() => {
        // Code to execute after the delay
        if (index < 3) {
            setIndex(index + 1)
        } else {
            setIndex(0)
        }
        console.log("Hello after 2 seconds!");
    }, 2000);

    // Optionally clean up the timeout on unmount
    //return () => clearTimeout(timeoutId)
    return (
        <Container>
            <div className="row  border-bottom ">
                <div className="col-3 pe-0 d-none d-md-flex">
                    <div className="bg-gray-60 text-white h-100 border-end border-color">
                        <div className="border-bottom text-center fw-bold text-uppercase py-2">
                            
                            {lang === "en" ? "Home" : "Accueil"}   
                        </div>
                        {datas?.toutes_sous_categories?.map((data, idx) => {
                            if (idx >= 4) {
                                return null
                            }
                            return (
                                <div className={`border-bottom py-4 cursor actu-title ${index === idx && "active fw-bold"}`} onClick={e => detail(e, data.slug)}>
                                    <h2 className="px-2 py-0 m-0 fs-16 fw-normal">
                                        {lang === "en" ? truncateText(data.titre_en, 95) : truncateText(data.titre, 95)}
                                    </h2>
                                </div>
                            );
                        })}



                        <div className="h-100 text-center py-3 pt-lg-4 mt-1">
                            <span className={`sm-circle mx-1 ${index === 0 && "active"}`}></span>
                            <span className={`sm-circle mx-1 ${index === 1 && "active"}`}></span>
                            <span className={`sm-circle mx-1 ${index === 2 && "active"}`}></span>
                            <span className={`sm-circle mx-1 ${index === 3 && "active"}`}></span>

                        </div>
                    </div>
                </div>
                <div className="col-9 ps-0 d-none d-md-flex">
                    <div
                        className="position-relative bg-banier w-100 h-100"
                        style={{ backgroundImage: `url(${seletedData.length !== 0 && URL + seletedData[index]?.image})` }}
                    >
                        <span
                            className="bg-primary position-absolute text-white p-2 text-uppercase fw-bold"
                            style={{ right: "3%", top: "3%" }}
                        >
                            {lang === "en" ? "News" : "Actu"}
                        </span>
                        <p
                            className="position-absolute fs-20 fw-bold"
                            style={{ left: "20%", bottom: "3%" }}
                        >
                            {/*seletedData.length !== 0 && seletedData[index].titre*/}
                        </p>
                    </div>
                </div>

                {/**Mobile */}
                <div className="col-12 d-md-none p-0">
                    <div
                        className="position-relative bg-banier"
                        style={{ backgroundImage: `url(${seletedData.length !== 0 && URL + seletedData[index]?.image})` }}
                    >
                        <img width={"100%"} src={URL + seletedData[index]?.image} alt={lang === 'en' ? seletedData[index]?.titre_en : seletedData[index]?.titre} className="w-100" />
                        <span
                            className="bg-primary position-absolute text-white p-2 text-uppercase fw-bold"
                            style={{ right: "3%", top: "3%" }}
                        >
                            {lang === "en" ? "News" : "Actu"}
                        </span>
                        <p
                            className="position-absolute fs-20 fw-bold"
                            style={{ left: "20%", bottom: "3%" }}
                        >
                            {/*seletedData.length !== 0 && seletedData[index].titre*/}
                        </p>
                    </div>
                    <div className="h-100 text-center py-3 pt-lg-4 mt-1 ">
                        <span className={`sm-circle mx-1 ${index === 0 && "active"}`}></span>
                        <span className={`sm-circle mx-1 ${index === 1 && "active"}`}></span>
                        <span className={`sm-circle mx-1 ${index === 2 && "active"}`}></span>
                        <span className={`sm-circle mx-1 ${index === 3 && "active"}`}></span>

                    </div>
                </div>
            </div>
        </Container>
    );
};
