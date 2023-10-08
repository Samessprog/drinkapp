//Imports
import { useContext } from "react";

import OwnDrinkCarusel from "../Components/OwnDrinkCarusel";
import { SessionContext } from "../Session/SessionContext";

function UserOwnDrinks({ addUserNewDrink, setAddUserNewDrink, drinkDatas }) {

    const userSesion = useContext(SessionContext).userSesion;
    const creator = userSesion.userID

  

    return (
        <div className="position-relative ">
            <label className="border-bottom fw-bolder ms-3 fs-5 d-flex d-sm-block justify-content-center"> Create your own drink</label>
            <div className="user-favourite-frinks-holder">
                <div className="user-favourite-frinks d-flex justify-content-center">

                    <OwnDrinkCarusel drinkDatas={drinkDatas} creator={creator} />

                </div>
            </div>
            <div className="d-flex mt-4 flex-md-row-reverse me-4 flex-column ">
                <div className="ms-3">
                    <button onClick={() => setAddUserNewDrink(!addUserNewDrink)} type="button" className="add-your-drink-button mt-2">Add your drink</button>
                </div>
            </div>
        </div >

    )
}

export default UserOwnDrinks;