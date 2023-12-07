//Imports
import { useContext, useEffect } from "react";

import OwnDrinkCarusel from "../../carouselsComponents/OwnDrinkCarusel";
import { SessionContext } from "../../Session/SessionContext";
import { useState } from "react";

function UserOwnDrinks({ addUserNewDrink, setAddUserNewDrink, freindsProfile }) {

    const userSesion = useContext(SessionContext).userSesion;
    const [userOwnDrink, setUserOwnDrink] = useState('')

    useEffect(() => {
        const fetchUserOwnDrinks = async () => {
            const userIDs = freindsProfile.friendID || userSesion.userID
            try {
                const response = await fetch(`http://localhost:3000/api/getOwnDrinks/${userIDs}`);
                const data = await response.json();
                if (data.success) {
                    setUserOwnDrink(data.drinks)
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserOwnDrinks();
    }, [userSesion]);

    return (
        <div className="position-relative ">
            <label className="border-bottom fw-bolder ms-3 fs-5 d-flex d-sm-block justify-content-center"> Create your own drink</label>
            <div className="user-favourite-frinks-holder">
                <div className="user-favourite-frinks d-flex justify-content-center">
                    <OwnDrinkCarusel
                        userOwnDrink={userOwnDrink}
                        freindsProfile={freindsProfile}
                    >
                    </OwnDrinkCarusel>
                </div>
            </div>
            {!freindsProfile.friendID &&
                <div className="d-flex mt-5 flex-xl-row-reverse me-5 ">
                    <div className="d-flex justify-content-center mt-4 align-items-center ">
                        <button className="mb-md-2 rounded-pill btn btn-secondary border rounded d-flex p-2 change-data-input-user" onClick={() => setAddUserNewDrink(!addUserNewDrink)}>
                            <div className="pe-2 ps-2">Create your own drink</div>
                        </button>
                    </div>
                </div>

            }
        </div >
    )
}

export default UserOwnDrinks;