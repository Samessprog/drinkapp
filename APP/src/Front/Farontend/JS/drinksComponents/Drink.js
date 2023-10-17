//Imports
import { useContext } from "react";
import { Link } from "react-router-dom";

import { SessionContext } from "../Session/SessionContext";
import FetchingDrinkIMG from "./FetchingDrinkIMG";

function Drink({ elm, setFavourites, userFavouriteDrinks, setClickedDrinkDetail }) {

    //take suer session
    const { userSesion } = useContext(SessionContext);

    //ADD your fav drink to DB 
    const favouriteHandler = (id) => {

        //user is not logged in
        if (userSesion === null) {
            alert('To add a drink to your favourites, you must first log in');
            return;
        }
        setFavourites(prevFavourites => [...prevFavourites, id]);
        let sessionidx = userSesion.userID;
        //POST drink ID to DB with userID
        try {

            fetch('http://localhost:3000/api/addToUserFavourite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, sessionidx }),
                credentials: 'include',
            });

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="drin-window drink-respons col-7 col-sm-5 col-md-4 col-lg-3  col-xxl-2  p-1 rounded m-3  position-relative">
            {/* miejsce na znacznik ulubione */}
            <Link className="text-decoration-none zz " to={`drinkDetail/${elm.ID_DRINK}`} onClick={() => setClickedDrinkDetail({ Drink: elm })}>
                <FetchingDrinkIMG elm={elm} classNameHolder='img-holder card overflow-hidden' classNameIMG='drink-img img-fluid' />
                <div className="basic-information-drink p-2 ">
                    <div className="d-flex flex-column flex-sm-row justify-content-between  align-items-center ">
                        <label className="fs-4 fw-bolder drink-name">{elm.DrinkName}</label>
                        <label className="rounded-circle rate fw-bolder d-flex align-items-center">{elm.Rate}
                            <svg className="star mb-1 ms-1" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" /></svg>
                        </label>
                    </div>
                    <label className="bg-light rounded-pill p-1 ps-2 pe-2 fw-bolder drink-creator d-flex justify-content-center">{elm.Creator}</label>
                    <div className="d-flex mt-2 y flex-column flex-md-row justify-content-center">

                        <div className="d-flex justify-content-between flex-wrap flex-sm-nowrap me-1">
                            <label className={elm.DifficultyLevel === 'Easy' ? 'easyLevelClass ' : elm.DifficultyLevel === 'Medium' ? 'mediumLevelClass ' : elm.DifficultyLevel === 'Hard' ? 'hardLevelClass ' : ''}>{elm.DifficultyLevel}</label>
                            {/*`bg-primary rounded-pill p-1 ps-2 pe-2 fw-bolder drink-taste ${elm.drinkType === 'Sour' ? 'bg-success' : elm.drinkType === 'Alko' ? 'bg-danger' : elm.drinkType === 'Zium' ? 'bg-dark' : ''}` */}
                            <label className={elm.Taste === 'Sour' ? 'sourClass ' : elm.Taste === 'Sweet' ? 'sweetClass ' : elm.Taste === 'Bitter' ? 'bitterClass' : ''}>{elm.Taste}</label>
                        </div>
                        <label className={elm.DrinkType === 'Soft' ? 'softClass' : 'alkoClass '}>{elm.DrinkType}</label>
                    </div>
                </div>
            </Link>
            {userSesion !== null &&
                <div onClick={() => favouriteHandler(elm.ID_DRINK)} className="position-absolute top-0 end-0 mt-2 me-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40">
                        <path className={userFavouriteDrinks.includes(elm.ID_DRINK) ? "favouriteStar" : "un-favouriteStar"} d="m320 816 160-122 160 122-62.667-197.333 160-113.334H542l-62-204.666-62.667 204.666H222l160 113.334L320 816Zm160 160q-82.333 0-155.333-31.5t-127.334-85.833Q143 804.333 111.5 731.333T80 576q0-83 31.5-156t85.833-127q54.334-54 127.334-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82.333-31.5 155.333T763 858.667Q709 913 636 944.5T480 976Zm0-66.666q139.333 0 236.334-97.334 97-97.333 97-236 0-139.333-97-236.334-97.001-97-236.334-97-138.667 0-236 97Q146.666 436.667 146.666 576q0 138.667 97.334 236 97.333 97.334 236 97.334ZM480 576Z" />
                    </svg>
                </div>
            }
        </div>

    )
}

export default Drink;
