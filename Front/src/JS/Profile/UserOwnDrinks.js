import React from "react";
import FavouriteDrinks from "./UserDrinks/FavouriteDrinks";

function UserOwnDrinks() {


    return (
        <div>
            <div className="user-favourite-frinks-holder">
                <label className="border-bottom"> Create your own drink</label>
                <div className="user-favourite-frinks d-flex justify-content-center">
                    
                    < FavouriteDrinks />

                </div>
            </div>
            <div className="d-flex">
                <div className="ms-3">
                    <button type="button" className="bt btn-info  ">Add your drink</button>
                </div>
                <div className="ms-3">
                    <button type="button" className="bt btn-info  ">Delete your drink</button>
                </div>
            </div>
        </div>
    )
}

export default UserOwnDrinks;