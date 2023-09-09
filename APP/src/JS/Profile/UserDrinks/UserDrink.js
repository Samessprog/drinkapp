import React, { useEffect, useState, useContext } from "react";
import { SessionContext } from "../../Session/SessionContext";
import { Link } from "react-router-dom";
import { Buffer } from 'buffer';
import { setUserFavouriteDrinks } from "../../States/actions";
import { Ring } from '@uiball/loaders'


function UserDrink({ elm }) {

    const [drinkImg, setDrinkImg] = useState('')

    const userSesion = useContext(SessionContext).userSesion;

    //convert IMG to normal from blob
    useEffect(() => {
        if (elm?.IMG && elm?.IMG.data && elm?.IMG.data.length !== 0) {

            const base64Image = Buffer.from(elm?.IMG.data).toString('base64');
            const imageURL = `data:image/jpeg;base64,${base64Image}`;
            setDrinkImg(imageURL)

        } else {
            setDrinkImg('https://staticsmaker.iplsc.com/smaker_production_2021_11_24/d9d5fac2c9271afdbc7205b695742eca-lg.jpg')
        }

    }, []);

    //Remove from Favourite
    const removeFromFavourite = (drinkID) => {

        const userID = userSesion.userID
        //POST drink IDs to DB with userID
        try {
            fetch('http://localhost:3000/api/removeFromUserFavourite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ drinkID, userID }),
                credentials: 'include',
            });

        } catch (error) {
            console.error(error);
        }
        //do zmiany
        window.location.reload();
    };

    const [favouriteAndOwnDrinkIMG, setFavouriteAndOwnDrinkIMG] = useState(null);
    const [fetchIMGCompleted, setFetchIMGCompleted] = useState(false)
    const [convertetFAVOWNIMG, setConvertedFAVOWNIMG] = useState('')


    //Remove Similar IDs 
    // useEffect(() => {
    // }, [elm?.ID_DRINK]);


    useEffect(() => {

        const fetchUserFavouriteDrinkImage = async () => {

            try {
                let ID_Drink = elm.ID_DRINK;
                const response = await fetch(`http://localhost:3000/api/fetchDrinkIMG/${ID_Drink}`, {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user favorite drink image.');
                }
                // Parsuj odpowiedź jako JSON
                const data = await response.json();
                setFavouriteAndOwnDrinkIMG(data.image);

            } catch (error) {
                console.error(error);
            }
        };
        fetchUserFavouriteDrinkImage();
    }, [elm?.ID_DRINK]);


    useEffect(() => {
        if (favouriteAndOwnDrinkIMG && favouriteAndOwnDrinkIMG.data.length > 0) {
            // Convert the image data to base64
            const base64Image = Buffer.from(favouriteAndOwnDrinkIMG.data).toString('base64');
            // Create the image URL using the base64 data
            const imageURL = `data:image/jpeg;base64,${base64Image}`;
            setConvertedFAVOWNIMG(imageURL);
            setFetchIMGCompleted(true)
        } else {
            setConvertedFAVOWNIMG('https://staticsmaker.iplsc.com/smaker_production_2021_11_24/d9d5fac2c9271afdbc7205b695742eca-lg.jpg');
        }

    }, [favouriteAndOwnDrinkIMG]);


    return (
        <div className="user-drink-holder mt-4 col col-5 col-sm-3 col-md-3 col-xl-2  me-5 ">
            <div className=" position-relative ">
                <Link to={`/drinkDetail/${elm?.ID_DRINK}`}>
                    {fetchIMGCompleted ? (
                        <div>
                            <img className=" img-fluid drink-img-favourite" src={convertetFAVOWNIMG} />
                            <div className="position-absolute favourite-drink-info-box ">
                                <div class="d-flex  flex-column justify-content-center align-items-center">
                                    <div className="cc d-flex  flex-column justify-content-center align-items-center">
                                        <label className=" mt-3 drink-creator ">
                                            {elm?.Creator}
                                        </label>
                                        <div className="d-flex mt-3">
                                            <label className="me-4 drink-level" >{elm?.DifficultyLevel}</label>
                                            <label className="drink-taste">{elm?.Taste}</label>
                                        </div>
                                        <label className=" mt-3 drink-type ">{elm?.DrinkType}</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div className="d-flex justify-content-center loading-icon-holder">
                            <Ring
                                size={90}
                                lineWeight={5}
                                speed={2}
                                color="black"
                            />
                        </div>
                    )}
                </Link >

                <div className="position-absolute top-0 end-0 mt-2 me-2" onClick={() => removeFromFavourite(elm?.ID_DRINK)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40">
                        <path className="golden-star" d="m320 816 160-122 160 122-62.667-197.333 160-113.334H542l-62-204.666-62.667 204.666H222l160 113.334L320 816Zm160 160q-82.333 0-155.333-31.5t-127.334-85.833Q143 804.333 111.5 731.333T80 576q0-83 31.5-156t85.833-127q54.334-54 127.334-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82.333-31.5 155.333T763 858.667Q709 913 636 944.5T480 976Zm0-66.666q139.333 0 236.334-97.334 97-97.333 97-236 0-139.333-97-236.334-97.001-97-236.334-97-138.667 0-236 97Q146.666 436.667 146.666 576q0 138.667 97.334 236 97.333 97.334 236 97.334ZM480 576Z" />
                    </svg>
                </div>


            </div>
        </div >
    )
}

export default UserDrink;
//className={userFavouriteDrinks.includes(elm.ID_Drink) ? "favouriteStar" : "un-favouriteStar"}