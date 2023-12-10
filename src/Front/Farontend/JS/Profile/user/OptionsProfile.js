//Imports
import { Link } from "react-router-dom"
import { setUserSession, setUserFavouriteDrinks } from "../../States/actions"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from "react"
import localhost from "../../../../../config/config"

function OptionsProfile({ setUserProfileOptions, setFriendsProfile }) {

    const dispatch = useDispatch()
    const userSesion = useSelector(state => state.user.useSesion)

    //Logout funciotn
    function logoutUser() {
        fetch(`http://${localhost}:3000/api/logout`, {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                dispatch(setUserSession(null))
            })
            .catch(error => console.error(error))
    }

    function handleLogoutClick() {
        logoutUser()
        dispatch(setUserFavouriteDrinks([]))
    }

    let menuRef = useRef()

    useEffect(() => {
        let handler = ((e) => {
            if (!menuRef.current.contains(e.target)) {
                setUserProfileOptions(false)
            }
        })
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    return (
        <div
            ref={menuRef}
            className="position-absolute end-0 mt-sm-2 me-sm-3 me-1 mt-4"
        >
            <ul className="d-flex flex-column DropdownProfilMenu ">
                <Link
                    to={"userProfile"}
                    className=" text-decoration-none"
                    onClick={() => setFriendsProfile({ friendID: null, freindNick: '' })}
                >
                    <li className="DropdownProfilMenu-elm  position-relative">Profile</li>
                </Link>
                {userSesion.role === 'admin' &&
                    <Link to={"admin"} >
                        <li className="DropdownProfilMenu-elm  position-relative">Admin</li>
                    </Link>
                }
                <Link to={"/"}>
                    <li
                        className="DropdownProfilMenu-elm mb-0"
                        onClick={handleLogoutClick}>Log out</li>
                </Link>
            </ul>
        </div>
    )
}

export default OptionsProfile
