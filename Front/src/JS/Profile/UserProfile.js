import React from "react";
import UserDetails from "./UserDetails";
import UserOwnDrinks from "./UserOwnDrinks";
import UserFavouriteDrinks from "./UserFavouriteDrinks";



function UserProfile() {


    return (
        <div className="user-details-holder">
            <UserDetails />
            <UserFavouriteDrinks />
            <UserOwnDrinks />
        </div>
    )
}


export default UserProfile;