import { Link } from "react-router-dom";
import { DeleteCard } from "../icons/DeleteCard";
import { LogoIcon } from "../icons/LogoIcon";
import { ActuCard } from "./ActuCard";
import { Container } from "./Container";

export const ArticleList = ({ children, datas=[], type=""}) => {
    const lang = localStorage.getItem("lang") || "FR";
    return (
        <>
            <Container>
                <div className="row my-5">
                    <h2 className="text-center mb-4">{children}</h2>
                    <div className="d-flex justify-content-center mb-4">
                        <LogoIcon />
                    </div>
                    <div className="col-12">
                        <div className="row row-cols-12 row-cols-md-3 g-4">
                            {datas?.toutes_sous_categories?.map((data, idx) => {
                                if(idx >= 3){
                                    return null
                                }
                                return <div className="col" key={idx+"-article"}>
                                    <ActuCard data={data} type={type}/>
                                </div>
                            })}
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <Link to={"/actualites-evenements/"+type} className="btn border">
                                {lang === "en" ? "View All" : "Voir tous"}
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};
