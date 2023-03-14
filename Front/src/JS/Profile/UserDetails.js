import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function UserDetails() {


    return (
        <div className=" col mt-3 ">
            <div class="d-flex justify-content-between p-5 flex-column flex-xl-row align-items-center">
                <div className=" d-flex align-items-center flex-column flex-md-row justify-content-center">
                    <div className="d-flex justify-content-center  align-items-center col-md-4 col-8 mb-4 me-4 col-xl-5">
                        <LazyLoadImage
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                            effect="blur"
                            className="img-fluid img-helper " alt="Img error"
                        />
                    </div>
                    <div className="d-flex flex-column col-7">
                        <input className="user-data-input" placeholder="Mail"></input>
                        <input className="mt-3 user-data-input" placeholder="User Name"></input>
                        <input className="mt-3 user-data-input" placeholder="Nick"></input>
                        <button type="button" className="user-data-button-submit mt-3">Change your Data</button>
                    </div>
                </div>
                <div className="badges-holder col-4 p-3 mt-5 col col-12 col-xl-5">
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

