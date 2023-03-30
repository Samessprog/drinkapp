import React from "react";
import FavouriteDrinks from "./UserDrinks/FavouriteDrinks";

function UserOwnDrinks({addUserNewDrink, setAddUserNewDrink }) {

    
    return (
        <div className="position-relative">
              <label className="border-bottom fw-bolder ms-3 fs-5"> Create your own drink</label>
            <div className="user-favourite-frinks-holder">
                <div className="user-favourite-frinks d-flex justify-content-center">

                    < FavouriteDrinks />

                </div>
            </div>
            <div className="d-flex mt-4 flex-md-row-reverse me-4 flex-column ">
                <div className="ms-3">
                    <button onClick={() => setAddUserNewDrink(!addUserNewDrink)} type="button" className="add-your-drink-button mt-2">Add your drink</button>
                </div>
                <div className="ms-3">
                    <button type="button" className="edit-your-drink-button mt-2">Edit your drink</button>
                </div>
            </div>
            <div className="position-absolute start-0 top-50 ms-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="scroll-arrow-fav-own" height="48" width="48"><path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z" /></svg>
            </div>
            <div className="position-absolute top-50 end-0 me-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="scroll-arrow-fav-own" height="48" width="48"><path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" /></svg>
            </div>
        </div >

    )
}

export default UserOwnDrinks;