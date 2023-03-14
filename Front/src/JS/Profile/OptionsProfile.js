import React from "react";
import { Link } from "react-router-dom";


function OptionsProfile() {

    return (
        <div className="position-absolute end-0 mt-2">
            <ul className="d-flex flex-column DropdownProfilMenu ">
                <Link to={"userProfile"} className="kk">
                    <li className="DropdownProfilMenu-elm  position-relative">Profile</li>
                </Link>
                <li className="DropdownProfilMenu-elm ">Log&nbsp;out</li>
            </ul>
        </div>
    )
}

export default OptionsProfile;