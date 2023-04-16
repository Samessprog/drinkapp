import React from "react";
import UserDetails from "./UserDetails";
import UserOwnDrinks from "./UserOwnDrinks";
import UserFavouriteDrinks from "./UserFavouriteDrinks";
import UserOwnDrinkPopup from "./UserDrinks/UserOwnDrinkPopup";


function UserProfile() {
    const [addUserNewDrink, setAddUserNewDrink] = React.useState(false)
    

    return (
        <div className="user-details-holder">
            <UserDetails />
            <UserFavouriteDrinks />
            <UserOwnDrinks
                setAddUserNewDrink={setAddUserNewDrink}
                addUserNewDrink={addUserNewDrink} />

            {addUserNewDrink && <UserOwnDrinkPopup addUserNewDrink={addUserNewDrink} setAddUserNewDrink={setAddUserNewDrink} />}
        </div>
    )
}


export default UserProfile;