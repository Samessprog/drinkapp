import React from "react";
import FavouriteDrinks from "./UserDrinks/FavouriteDrinks";

function UserFavouriteDrinks() {


    return (
        <div>
            <div className="user-favourite-frinks-holder">
                <label className="border-bottom fw-bolder"> YOUR FAVORITE</label>
                <div className="user-favourite-frinks d-flex justify-content-center pb-5 ">
                    {/* Dodać mapowanie ulubionych */}

                    <FavouriteDrinks />
                    <FavouriteDrinks />
                    <FavouriteDrinks />
                    
                   
                </div>
            </div>
        </div>
    )
}

export default UserFavouriteDrinks;