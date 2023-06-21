import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Buffer } from 'buffer';


function FavouriteDrinks({ elm }) {

    const [drinkImg, setDrinkImg] = useState('')

    useEffect(() => {
        if (elm?.IMG && elm?.IMG.data) {

            const base64Image = Buffer.from(elm?.IMG.data).toString('base64');
            const imageURL = `data:image/jpeg;base64,${base64Image}`;
            setDrinkImg(imageURL)

        }
    });
  
    return (
        <div className="user-drink-holder mt-4 col col-5 col-sm-3 col-md-3 col-xl-2  me-5 ">
            <Link to={"/drinkDetail/1"}>
                <div className=" position-relative ">
                    <img className=" img-fluid drink-img-favourite" src={drinkImg} />
                    <div className="position-absolute favourite-drink-info-box ">
                        <div class="d-flex  flex-column justify-content-center align-items-center">
                            <div className="cc d-flex  flex-column justify-content-center align-items-center">
                                <label className=" mt-3 drink-creator ">
                                    {elm?.Creator}
                                </label>
                                <div className="d-flex mt-3">
                                    <label className="me-4 drink-level" >{elm?.DifficultyLevel}</label>
                                    <label className="drink-taste">{elm?.Taste}</label>
                                </div>
                                <label className=" mt-3 drink-type ">{elm?.DrinkType}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </Link >
            <div className="d-flex justify-content-md-between flex-md-row flex-column align-items-center ">
                <div className="ms-1">{elm?.DrinkName}</div>
                <label className="rounded-circle rate fw-bolder d-flex align-items-center me-1">2
                    <svg className="star mb-1 ms-1" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" /></svg>
                </label>
            </div>
        </div >
    )
}

export default FavouriteDrinks;