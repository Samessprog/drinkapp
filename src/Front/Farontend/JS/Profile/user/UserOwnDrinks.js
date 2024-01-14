//Imports
import { useContext, useEffect } from "react"

import OwnDrinkCarusel from "../../carouselsComponents/OwnDrinkCarusel"
import { SessionContext } from "../../Session/SessionContext"
import { useState } from "react"
import localhost from "../../../../../config/config"

function UserOwnDrinks({ addUserNewDrink, setAddUserNewDrink, friendsProfile }) {

    const userSession = useContext(SessionContext).userSesion
    const [userOwnDrink, setUserOwnDrink] = useState('')

    useEffect(() => {
        const fetchUserOwnDrinks = async () => {
            const userIDs = friendsProfile.friendID || userSession.userID
            try {
                const response = await fetch(`http://${localhost}:3000/api/getOwnDrinks/${userIDs}`)
                const data = await response.json()
                if (data.success) {
                    setUserOwnDrink(data.drinks)
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchUserOwnDrinks()
    }, [userSession])

    return (
        <div className="position-relative ">
            <label className="border-bottom fw-bolder ms-3 fs-5 d-flex d-sm-block justify-content-center"> Create your own drink</label>
            <div className="user-favourite-frinks-holder">
                <div className="user-favourite-frinks d-flex justify-content-center">
                    <OwnDrinkCarusel
                        userOwnDrink={userOwnDrink}
                        friendsProfile={friendsProfile}
                    >
                    </OwnDrinkCarusel>
                </div>
            </div>
            {!friendsProfile.friendID &&
                <div className="d-flex mt-5 flex-xl-row-reverse me-5 ">
                    <div className="d-flex justify-content-center mt-4 align-items-center ">
                        <button
                            className="mb-md-2 rounded-pill btn btn-secondary border rounded d-flex p-2 change-data-input-user"
                            onClick={() => setAddUserNewDrink(!addUserNewDrink)}
                        >
                            <div className="pe-2 ps-2">Create your own drink</div>
                        </button>
                    </div>
                </div>

            }
        </div >
    )
}

export default UserOwnDrinks