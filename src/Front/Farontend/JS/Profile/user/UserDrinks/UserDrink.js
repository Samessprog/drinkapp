import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Buffer } from 'buffer'

import FetchingDrinkIMG from "../../../drinksComponents/FetchingDrinkIMG"
import { SessionContext } from "../../../Session/SessionContext"
import { API_URL } from '../../../Components/Constants'

function UserDrink({ elm, isHidden, setIsHidden, friendsProfile }) {

    const [drinkImg, setDrinkImg] = useState('')

    const userSession = useContext(SessionContext).userSesion

    //convert IMG to normal from blob
    useEffect(() => {
        if (elm?.IMG && elm?.IMG.data && elm?.IMG.data.length !== 0) {

            const base64Image = Buffer.from(elm?.IMG.data).toString('base64')
            const imageURL = `data:image/jpeg;base64,${base64Image}`
            setDrinkImg(imageURL)

        } else {
            setDrinkImg('https://staticsmaker.iplsc.com/smaker_production_2021_11_24/d9d5fac2c9271afdbc7205b695742eca-lg.jpg')
        }

    }, [])
    
    //Remove from Favourite
    const removeFromFavorite = (drinkID) => {
        let userID = userSession.userID
        //POST drink IDs to DB with userID
        try {
            fetch(`${API_URL}removeFromUserFavourite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ drinkID, userID }),
                credentials: 'include',
            })

        } catch (error) {
            console.error(error)
        }
    }

    const { ID_Drink } = elm
    let ID_DRINK = ID_Drink

    return (
        <div className={`user-drink-holder mt-0 mt-md-4 me-3 me-md-5 col-6 col-md-3 `}>
            <div className=" position-relative col-12">
                <Link to={`/drinkDetail/${ID_DRINK}`} >
                    <FetchingDrinkIMG
                        ID_DRINK={ID_DRINK}
                        classNameHolder='card favourite-img-holder'
                        classNameIMG='img-fluid drink-img-favourite'
                        alt='loading error'
                    />
                    <div className={`position-absolute favourite-drink-info-box d-flex flex-column justify-content-center align-items-center`}>
                        <div className="d-flex  flex-column justify-content-center align-items-center">
                            <div className="cc d-flex  flex-column justify-content-center align-items-center ">
                                <label className="drink-info-hover fs-4">Drink information</label>
                                <label className=" drink-info-hover fs-5 mt-2" >{elm?.DifficultyLevel}</label>
                                <label className="drink-info-hover mt-2 fs-5">{elm?.Taste}</label>
                                <label className="drink-info-hover mt-2 fs-5">{elm?.DrinkType}</label>
                                <div className="d-flex flex-column drink-info-hover mt-2 fs-5 col-12 align-items-center">
                                    <label>Creator: </label>
                                    <label className="drink-creatoren ms-2">
                                        {elm?.Creator}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link >
                {friendsProfile?.friendID === null &&
                    <div className="position-absolute top-0 end-0 mt-2 me-2 " onClick={() => {
                        removeFromFavorite(ID_DRINK)
                        setIsHidden(!isHidden)
                    }} >
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40">
                            <path className="golden-star" d="m320 816 160-122 160 122-62.667-197.333 160-113.334H542l-62-204.666-62.667 204.666H222l160 113.334L320 816Zm160 160q-82.333 0-155.333-31.5t-127.334-85.833Q143 804.333 111.5 731.333T80 576q0-83 31.5-156t85.833-127q54.334-54 127.334-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82.333-31.5 155.333T763 858.667Q709 913 636 944.5T480 976Zm0-66.666q139.333 0 236.334-97.334 97-97.333 97-236 0-139.333-97-236.334-97.001-97-236.334-97-138.667 0-236 97Q146.666 436.667 146.666 576q0 138.667 97.334 236 97.333 97.334 236 97.334ZM480 576Z" />
                        </svg>
                    </div>
                }
            </div>
        </div >
    )
}

export default UserDrink