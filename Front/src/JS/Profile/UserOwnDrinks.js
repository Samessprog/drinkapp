import React from "react";
import FavouriteDrinks from "./UserDrinks/FavouriteDrinks";

function UserOwnDrinks() {


    return (
        <div>
            <div className="user-favourite-frinks-holder">
                <label className="border-bottom fw-bolder"> Create your own drink</label>
                <div className="user-favourite-frinks d-flex justify-content-center">

                    < FavouriteDrinks />
          
                </div>
            </div>
            <div className="d-flex mt-4 flex-md-row-reverse me-4 flex-column ">
                <div className="ms-3">
                    <button type="button" className="add-your-drink-button">Add your drink</button>
                </div>
                <div className="ms-3">
                    <button type="button" className="edit-your-drink-button">Edit your drink</button>
                </div>
            </div>
        </div>
    )
}

export default UserOwnDrinks;