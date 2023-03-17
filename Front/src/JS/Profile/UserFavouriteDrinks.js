import React, { useState, useRef, useEffect } from "react";
import FavouriteDrinks from "./UserDrinks/FavouriteDrinks";

function UserFavouriteDrinks() {

    const [position, setPosition] = useState(0);
    const [numSlides, setNumSlides] = useState(10); // or however many slides you have
  
    const handleLeftClick = () => {
      setPosition(position - 1);
    };
  
    const handleRightClick = () => {
      setPosition(position + 1);
    };
  
    return (
      <div className="position-relative">
        <label className="border-bottom fw-bolder">YOUR FAVORITE</label>
        <div className="user-favourite-frinks-holder d-flex">
          <div
            className="user-favourite-frinks d-flex justify-content-center pb-5"
            style={{ transform: `translateX(${-position * 100}%)` }}
          >
            {[...Array(numSlides)].map((_, i) => (
              <FavouriteDrinks key={i} />
            ))}
          </div>
        </div>
        <div
          className="position-absolute start-0 top-50 ms-2"
          onClick={handleLeftClick}
        >
          <svg
            id="left-arrow"
            xmlns="http://www.w3.org/2000/svg"
            className="scroll-arrow-fav-own"
            height="48"
            width="48"
          >
            <path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z" />
          </svg>
        </div>
        <div
          className="position-absolute top-50 end-0 me-1"
          onClick={handleRightClick}
        >
          <svg
            id="right-arrow"
            xmlns="http://www.w3.org/2000/svg"
            className="scroll-arrow-fav-own"
            height="48"
            width="48"
          >
            <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
          </svg>
        </div>
      </div>
    );
}

export default UserFavouriteDrinks;