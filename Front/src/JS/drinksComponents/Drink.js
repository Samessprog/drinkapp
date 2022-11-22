import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";


function Drink({ setDrinkDetailsPopup }) {



    return (

        <div onClick={() => setDrinkDetailsPopup(true)} className=" drin-window col-7 col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-2 col p-1 rounded m-3 ">
            <div className="img-holder card  overflow-hidden ">

                <LazyLoadImage
                    src={"https://www.acouplecooks.com/wp-content/uploads/2021/06/Strawberry-Water-006.jpg"}
                    effect="blur"
                    className="drink-img  " alt="Img error"

                />

            </div>
            <div className="basic-information-drink p-2">
                <div className="d-flex justify-content-between  align-items-center ">
                    <labe className="fs-4 fw-bolder">Sex on the bitch</labe>
                    <label className="rounded-circle rate fw-bolder d-flex align-items-center">5
                        <svg className="star mb-1 ms-1" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" /></svg>
                    </label>
                </div>


                <div className="d-flex  mt-3  justify-content-evenly">
                    <label className="bg-light rounded-pill p-1 fw-bolder drink-creator ">Albert</label>
                    <label className="diff-level rounded-pill p-1 fw-bolder ">Easy</label>
                    <label className="drink-taste rounded-pill p-1 fw-bolder ">Sour</label>
                    <label className="bg-primary rounded-pill p-1 fw-bolder ">Alkoholic</label>
                </div>

            </div>
        </div>

    )




}

export default Drink;
