import { DeleteCard } from "../icons/DeleteCard";
import { LogoIcon } from "../icons/LogoIcon";

export const Partenaire = ({ children }) => {
    const lang = localStorage.getItem("lang") || "FR";  
    return (
        <>
            <div className="row border-top border-bottom pt-5 bg-gray-f6">
                <h2 className="text-center mb-4">{children}</h2>
                <div className="d-flex justify-content-center mb-4">
                    <LogoIcon />
                </div>
                <div className="col-12 col-md-8 col-lg-7 mx-auto mb-5 d-none d-md-block">
                    <div className="row row-cols-12 row-cols-md-4">
                        {[...Array(4).keys()].map((data, idx) => {
                            return (
                                <div className="px-3 mb-2" key={idx+"-partenaire"}>
                                    <div className="card p-3 pb-2 text-center">
                                        <span className="text-primary fw-bold fs-36">300</span>
                                        <p className="p-0 pt-2 m-0">
                                            {lang === "en" ? "partners around the world..." : "partenaires à travers le monde..."}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="col-12 mx-auto mb-5 d-md-none">
                    <div className="row row-cols-12">
                        {[...Array(4).keys()].map((data, idx) => {
                            return (
                                <div className="px-3 mb-3 px-5" key={idx+"-partenaire"}>
                                    <div className="card w-75 mx-auto p-3 pb-2 text-center">
                                        <span className="text-primary fw-bold fs-36">300</span>
                                        <p className="p-0 pt-2 m-0">partenaires à travers le monde...</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};
