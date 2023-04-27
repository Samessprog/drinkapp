import React from "react";
import { Link } from "react-router-dom";
import { setUserSession } from "../States/actions";
import { useDispatch } from 'react-redux';

function OptionsProfile() {

    const dispatch = useDispatch();

    function logoutUser() {
        fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                dispatch(setUserSession(null))
            })
            .catch(error => console.error(error));
    }

    function handleLogoutClick() {
        logoutUser();
    }

    return (
        <div className="position-absolute end-0 mt-2">
            <ul className="d-flex flex-column DropdownProfilMenu ">
                <Link to={"userProfile"} className="kk">
                    <li className="DropdownProfilMenu-elm  position-relative">Profile</li>
                </Link>
                <Link to={"/"} className="kk">
                    <li className="DropdownProfilMenu-elm " onClick={handleLogoutClick}>Log&nbsp;out</li>
                </Link>
            </ul>
        </div>
    )
}

export default OptionsProfile;
