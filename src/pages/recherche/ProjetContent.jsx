import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../../services/request";
import endPoint from "../../services/endPoint";
import rech from "../../assets/images/recherche.png";

export const ProjetContent = ({}) => {
    const { slugOne } = useParams();
    const [data, setData] = useState({});
    const [seletedData, setSelectedData] = useState({});
    const [sectionDetail,setSectionDetail] = useState("")

    useEffect(() => {
        get();
    }, [slugOne]);

    const get = () => {
        request
            .get(endPoint.categories + "/" + slugOne)
            .then((res) => {
                //console.log(res.data)
                setData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <h1 className="text-primary">{data.titre}</h1>
            <div className="my-4">
                <div dangerouslySetInnerHTML={{ __html: data.contenu }} />
            </div>
            {seletedData.titre === undefined ? (
                <>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {data.toutes_sous_categories?.map((data, idx) => {
                            return (
                                <div className="col " onClick={e => {
                                    e.preventDefault()
                                    setSelectedData(data)
                                }}>
                                    <div className="position-relative">
                                        <img width={"100%"} src={rech} alt="" />
                                        <div
                                            className="position-absolute text-white text-center px-2"
                                            style={{
                                                bottom: "12px",
                                                left: "0",
                                            }}
                                        >
                                            <span>{data.titre}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <div className="btn border">Voir tous les projets</div>
                    </div>
                </>
            ) : (
                <>
                <div className="row">
                    <div className="col-12">
                        <h6 className="text-primary">{seletedData.titre}</h6>
                        <div className="d-flex flex-wrap">
                            {["Institution de rattachement","Laboratoires associés","Descriptif du programme","Axes de recherche"].map(
                                    (data, idx) => {
                                        if (
                                            idx === 0 &&
                                            sectionDetail === ""
                                        ) {
                                            setSectionDetail(data);
                                        }
                                        return (
                                            <div
                                                className={`me-2 mt-3 cursor p-2 ${
                                                    sectionDetail ===
                                                        data &&
                                                    "bg-primary text-white fw-bold"
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    //setViewContent(!viewContent);
                                                    setSectionDetail(data);
                                                    console.log(data);
                                                }}
                                            >
                                                {data}
                                            </div>
                                        );
                                    }
                                )}
                        </div>
                        <p className="py-2">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sectionDetail?.contenu__,
                                }}
                            />
                        </p>
                    </div>
                </div>
                </>
            )}
        </>
    );
};
