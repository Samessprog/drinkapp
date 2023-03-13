import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function UserDetails() {




    return (
        <div className="user-details-holder col mt-3">
            <div class="d-flex justify-content-between p-5">

                <div className=" d-flex align-items-center ">
                    <div className=" ">
                        <LazyLoadImage
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                            effect="blur"
                            className="img-fluid img-helper col-8" alt="Img error"
                        />
                    </div>
                    <div className="d-flex flex-column ">
                        <input className="user-data-input" placeholder="Mail"></input>
                        <input className="mt-3 user-data-input" placeholder="User Name"></input>
                        <input className="mt-3 user-data-input" placeholder="Nick"></input>
                        <button type="button" className="btn btn-secondary mt-3">Change your Data</button>
                    </div>
                </div>
                <div className="badges-holder col-4 p-3">
                    <label className="badges-start">Your badges:</label>
                    <div>
                        No badges
                    </div>
                </div>
            </div>

            <div className="user-favourite-frinks-holder">
                <label className="border-bottom"> YOUR FAVORITE</label>
                <div className="user-favourite-frinks d-flex justify-content-center pb-5">
                    DRINKIII
                </div>

            </div>

            <div className="user-favourite-frinks-holder">
                <label className="border-bottom"> Create your own drink</label>
                <div className="user-favourite-frinks d-flex justify-content-center">
                    DRINKIII
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

export default UserDetails;

