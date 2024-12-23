import { FlecheLongIcon } from "../../icons/FlecheLong";
import book from "../../assets/images/book.png";

export const Livre = ({label}) => {
    return (
        <>
            <h1 className="text-primary">{label}</h1>
            <div className="my-4">
                De la dizaine de centres de recherche sur les STIES sur le
                continent, aucune ne se trouve en Afrique francophone. Pourtant,
                comme le souligne l’Union Africaine. De la dizaine de centres de
                recherche sur les STIES sur le continent, aucune ne se trouve en
                Afrique francophone.
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {[...Array(6).keys()].map((data, idx) => {
                    return (
                        <div className="col ">
                            <div className="position-relative">
                                <img width={"100%"} src={book} alt="" />
                                <div
                                    className="position-absolute text-white text-center px-2 d-none"
                                    style={{
                                        bottom: "12px",
                                        left: "0",
                                    }}
                                >
                                    <span>
                                        Projet {idx + 1} <FlecheLongIcon />
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="d-flex justify-content-center mt-4">
                <div className="btn border">Voir tous les livres</div>
            </div>
        </>
    );
};
