import { bottom } from "@popperjs/core";
import rect from "../assets/images/rect.png";
import { URL } from "../services/request";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../services/service";

const month = {
    "0": "Janv.",
    "1": "Févr.",
    "2": "Mars",
    "3": "Avr.",
    "4": "Mai",
    "5": "Juin",
    "6": "Juil.",
    "7": "Août",
    "8": "Sept.",
    "9": "Oct.",
    "10": "Nov.",
    "11": "Déc."
  }
  
export const ActuCard = ({data, type}) => {

    const navigate = useNavigate()
    const lang = localStorage.getItem("lang") || "FR"
    const detail = (e) => {
        e.preventDefault()
        navigate("/actualites-evenements/"+type+"/"+data.slug)
    }
    return (
        <>
            <div className="card" onClick={e => detail(e,data.slug)}>
                <div className="position-relative">
                    <img width={"100%"} src={URL+data.image} alt="" />
                    <div
                        className="position-absolute w-100 text-center"
                        style={{ bottom: "0", left: "0" }}
                    >
                        <div className="d-inline-block mx-auto bg-white py-3 px-4">
                            <span className="fs-40 fw-bold text-primary">{new Date(data.created_at).getDate()}</span> <br />
                            <span className="text-uppercase">{month[new Date(data.created_at).getMonth()]} {new Date(data.created_at).getFullYear()}</span>
                        </div>
                    </div>
                </div>
                <div className="text-center px-5 py-3 cursor">
                    <span className="text-muted d-inline-block mb-2">
                        {lang === "en" ? "University of Thomas Sankara" : "Université thomas sankara"}
                    </span>{" "}
                    <br />
                    <div className="text-start fw-bold">
                        {truncateText(data.titre, 95)}
                        
                    </div>
                </div>
            </div>
        </>
    );
};
