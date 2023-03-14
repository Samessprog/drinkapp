import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function FavouriteDrinks() {

    return (
        <div className="user-drink-holder mt-4 col col-2 me-3">
            <Link to={"/drinkDetail/1"}>
                <div className="">
                    <LazyLoadImage className=" img-fluid" src="https://www.acouplecooks.com/wp-content/uploads/2021/06/Strawberry-Water-006.jpg" />
                </div>
            </Link>
            <div className="d-flex justify-content-between">
                <div className="ms-1">Drink Name</div>
                <label className="rounded-circle rate fw-bolder d-flex align-items-center me-1">2
                    <svg className="star mb-1 ms-1" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" /></svg>
                </label>
            </div>

        </div>
    )
}

export default FavouriteDrinks;