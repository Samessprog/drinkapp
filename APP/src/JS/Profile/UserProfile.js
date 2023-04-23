import { useState, useContext } from "react";
import UserDetails from "./UserDetails";
import UserOwnDrinks from "./UserOwnDrinks";
import UserFavouriteDrinks from "./UserFavouriteDrinks";
import UserOwnDrinkPopup from "./UserDrinks/UserOwnDrinkPopup";
import { SessionContext } from "../Session/SessionContext";

function UserProfile() {
    const [addUserNewDrink, setAddUserNewDrink] = useState(false)
    const { userSesion} = useContext(SessionContext);


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