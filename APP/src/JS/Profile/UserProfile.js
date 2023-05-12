import { useState, useContext } from "react";
import UserDetails from "./UserDetails";
import UserOwnDrinks from "./UserOwnDrinks";
import UserFavouriteDrinks from "./UserFavouriteDrinks";
import UserOwnDrinkPopup from "./UserDrinks/UserOwnDrinkPopup";
import { SessionContext } from "../Session/SessionContext";
import { Navigate } from "react-router-dom";



function UserProfile() {
    const [addUserNewDrink, setAddUserNewDrink] = useState(false)
    const { userSesion } = useContext(SessionContext);

    if (userSesion === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="user-details-holder">
            <UserDetails userSesion={userSesion} />
            <UserFavouriteDrinks />
            <UserOwnDrinks
                setAddUserNewDrink={setAddUserNewDrink}
                addUserNewDrink={addUserNewDrink} />

            {addUserNewDrink && <UserOwnDrinkPopup addUserNewDrink={addUserNewDrink} setAddUserNewDrink={setAddUserNewDrink} />}
        </div>
    )
}


export default UserProfile;