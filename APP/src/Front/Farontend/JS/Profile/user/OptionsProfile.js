//Imports
import { Link } from "react-router-dom";
import { setUserSession, setUserFavouriteDrinks } from "../../States/actions";
import { useDispatch, useSelector } from 'react-redux';


function OptionsProfile() {

    const dispatch = useDispatch();
    const userSesion = useSelector(state => state.user.useSesion)

    //Logout funciotn
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
    // reload Window !!Zamiast tego wyczyść state? i daj adnotracje o wylogowaniu się 
    function handleLogoutClick() {
        logoutUser();
        dispatch(setUserFavouriteDrinks([]))
    }


    return (
        <div className="position-absolute end-0 mt-2 me-3">
            <ul className="d-flex flex-column DropdownProfilMenu ">
                <Link to={"userProfile"} className="user-profile-links">
                    <li className="DropdownProfilMenu-elm  position-relative">Profile</li>
                </Link>
                {userSesion.role === 'admin' &&
                    <Link to={"admin"} className="user-profile-links">
                        <li className="DropdownProfilMenu-elm  position-relative">Admin</li>
                    </Link>
                }
                <Link to={"/"} className="user-profile-links">
                    <li className="DropdownProfilMenu-elm " onClick={handleLogoutClick}>Log&nbsp;out</li>
                </Link>
            </ul>
        </div>
    )
}

export default OptionsProfile;
