import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";

function DrinkDetails({ drinkDatas }) {

    const { id } = useParams()
    const [drinksDetail, setDrinkDetail] = React.useState({})


    React.useEffect(() => {
        const result = drinkDatas.filter((elm) => {
            if (elm.ID_Drink === id) {
                setDrinkDetail(elm)
                return elm;
            }
        })
    })
    {/* [id] */ }

  
    //console.log(drinksDetail.Ingredients)

    return (
        <div className="drink-holder">

            <div className="drink-main-container mt-5 ms-4 me-4">
                <div className="d-flex justify-content-between flex-lg-row flex-column align-items-center">
                    <div className=" ">
                        <div className="d-flex  align-items-center">
                            <header>
                                <div className="drink-name fs-3 fw-bolder">{drinksDetail.DrinkName}</div>
                            </header>
                            <div className="d-flex ms-4 align-items-center">
                               
                                <label className="fs-3 rate"> {drinksDetail.Rate} </label>
                                <svg className="star" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" /></svg>

                            </div>
                        </div>

                        {/*Opis i składniki do drinku  */}

                        <div className="mt-5">
                            <article>
                                <div className="description-holder overflow-auto">
                                    <section>
                                        <label className="fs-5 fw-bolder">{drinksDetail.DrinkName}</label>
                                        <p>{drinksDetail.Description} </p>
                                    </section>
                                </div>
                            </article>
                            <div className="d-flex flex-column d-flex  align-items-center">

                                <label className="fs-4 fw-bolder">Specifications</label>

                                <div className="d-flex  mt-3 basic-information-drink">

                                    <label className="bg-light rounded-pill p-1  fw-bolder drink-creator">{drinksDetail.Creator}</label>
                                    <label className="diff-level rounded-pill p-1 ms-2 fw-bolder ">{drinksDetail.DifficultyLevel}</label>
                                    <label className="drink-taste rounded-pill p-1  ms-2 fw-bolder ">{drinksDetail.Taste}</label>
                                    <label className="bg-primary rounded-pill p-1  ms-2 fw-bolder ">{drinksDetail.DrinkType}</label>

                                </div>

                            </div>

                            <div className="mt-5">
                                <label className="fs-5 fw-bolder">Ingredients:</label>
                                <ul className="mt-2 ingrediets-list overflow-auto">

                                    {drinksDetail.Ingredients}


                                </ul>

                            </div>

                        </div>

                    </div>

                    <div className=" img-holder mt-4 mb-5 mt-lg-0 mb-lg-0 col-8 col-sm-5 col-md-4 col-lg-3 ">
                        <LazyLoadImage
                            src={drinksDetail.IMG}
                            effect="blur"
                            className="img-fluid img-helper " alt="Img error"

                        />
                    </div>

                </div>

                {/* Sposów przygotowania drinku */}

                <div className="d-flex mt-20  justify-content-center  fs-3 fw-bolder">Preparation</div>
                <div className="mt-2 border rounded pt-4 ps-4 pe-4">
                    <div className="overflow-auto preparation-holder fs-5 d-flex align-items-center flex-column">


                        <div>{drinksDetail.Preparation}</div>

                        <div className="mt-4">
                            <img alt="ERR"></img>

                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4 mt-xl-20" >

                        <ul className="pagination mb-1 ">
                            <li className="page-item " ><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default DrinkDetails;