import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function Drink({ setDrinkDetailsPopup, elm }) {

    return (

        <div onClick={() => setDrinkDetailsPopup(true)} className="drin-window col-7 col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-3 col p-1 rounded m-3 ">
            
            {/* miejsce na znacznik ulubione */}
            <Link className="text-decoration-none " to={`drinkDetail/${elm.ID_Drink}`} >
                <div className="img-holder card  overflow-hidden position-relative  ">
                    
                    <LazyLoadImage
                        src={elm.IMG}
                        effect="blur"
                        className="drink-img img-flui" alt="Loading error"
                    />

                </div>
                <div className="basic-information-drink p-2">
                    <div className="d-flex justify-content-between  align-items-center ">
                        <label className="fs-4 fw-bolder drink-name">{elm.DrinkName}</label>
                        <label className="rounded-circle rate fw-bolder d-flex align-items-center">{elm.Rate}
                            <svg className="star mb-1 ms-1" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" /></svg>
                        </label>
                    </div>


                    <div className="d-flex  mt-3  justify-content-evenly ">
                        <label className="bg-light rounded-pill p-1 ps-2 pe-2 fw-bolder drink-creator ">{elm.Creator}</label>
                        <label className="diff-level rounded-pill p-1 ps-2 pe-2 fw-bolder ">{elm.DifficultyLevel}</label>
                        <label className="drink-taste rounded-pill p-1 ps-2 pe-2 fw-bolder ">{elm.Taste}</label>
                        <label className="bg-primary rounded-pill p-1 ps-2 pe-2 fw-bolder drink-taste">{elm.DrinkType}</label>
                    </div>

                </div>
            </Link>
        </div>

    )
}

export default Drink;
