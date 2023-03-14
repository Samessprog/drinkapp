import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function UserDetails() {


    return (
        <div className=" col mt-3">
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
                        <button type="button" className="user-data-button-submit mt-3">Change your Data</button>
                    </div>
                </div>
                <div className="badges-holder col-4 p-3">
                    <label className="badges-start">Your badges:</label>
                    <div className="d-flex  justify-content-center">
                        No badges
                    </div>
                </div>
            </div>

        </div>
    )

}

export default UserDetails;

