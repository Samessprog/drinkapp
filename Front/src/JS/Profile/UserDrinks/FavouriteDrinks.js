import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function FavouriteDrinks( {name}) {

    return (
        <div className="user-drink-holder mt-4 col col-4 col-sm-3 col-md-3 col-xl-2  me-3">
            <Link to={"/drinkDetail/1"}>
                <div className="">
                    <img className=" img-fluid drink-img-favourite" src={name}/>
                </div>
            </Link>
            <div className="d-flex justify-content-md-between flex-md-row flex-column align-items-center ">
                <div className="ms-1">Drink Name</div>
                <label className="rounded-circle rate fw-bolder d-flex align-items-center me-1">2
                    <svg className="star mb-1 ms-1" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" /></svg>
                </label>
            </div>

        </div>
    )
}

export default FavouriteDrinks;