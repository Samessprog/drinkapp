import React, { useState, useRef, useEffect } from "react";
import FavouriteDrinks from "./UserDrinks/FavouriteDrinks";
import Carousel from "../Components/Carousel";

function UserFavouriteDrinks() {
  
  return (
    <div className="favourite-holder-user-drink col-12">
      <label className="border-bottom fw-bolder ms-3 fs-5 d-flex d-sm-block justify-content-center">Your favourite</label>
      <div className="user-favourite-frinks-holder d-flex justify-content-center col-12">

        <Carousel>

          <FavouriteDrinks name="https://a.allegroimg.com/s512/1153b7/34215cf84f60b87af446a9c6579e/Plakat-Anime-Jibaku-Shounen-Hanako-kun-jshk_053-A3" />
          <FavouriteDrinks name="https://pliki.ppe.pl/storage/66824ef0c93f961e8aa6/66824ef0c93f961e8aa6.jpg" />
          <FavouriteDrinks name="https://pliki.ppe.pl/storage/66824ef0c93f961e8aa6/66824ef0c93f961e8aa6.jpg" />
          <FavouriteDrinks name="https://a.allegroimg.com/s512/1153b7/34215cf84f60b87af446a9c6579e/Plakat-Anime-Jibaku-Shounen-Hanako-kun-jshk_053-A3" />
          <FavouriteDrinks name="https://pliki.ppe.pl/storage/66824ef0c93f961e8aa6/66824ef0c93f961e8aa6.jpg" />
          <FavouriteDrinks name="https://pliki.ppe.pl/storage/66824ef0c93f961e8aa6/66824ef0c93f961e8aa6.jpg" />
          <FavouriteDrinks name="https://a.allegroimg.com/s512/1153b7/34215cf84f60b87af446a9c6579e/Plakat-Anime-Jibaku-Shounen-Hanako-kun-jshk_053-A3" />

        </Carousel>

      </div>

    </div>
  );
}

export default UserFavouriteDrinks;