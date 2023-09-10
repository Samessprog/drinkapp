import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { Link } from "react-router-dom";
import { Ring } from '@uiball/loaders'


function DrinksProfile({ elm }) {

    const [drinkProfileIMG, setdrinkProfileIMG] = useState('')



    const [drinkIMGs, setDrinkIMG] = useState(null);
    const [convertetIMG, setConvertedIMG] = useState('')
    const [fetchIMGCompleted, setFetchIMGCompleted] = useState(false)


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
                setDrinkIMG(data.image);

            } catch (error) {
                console.error(error);
            }
        };
        fetchUserFavouriteDrinkImage();
    }, [elm.ID_DRINK]);


    useEffect(() => {
        if (drinkIMGs && drinkIMGs.data.length > 0) {
            // Convert the image data to base64
            const base64Image = Buffer.from(drinkIMGs.data).toString('base64');
            // Create the image URL using the base64 data
            const imageURL = `data:image/jpeg;base64,${base64Image}`;
            setConvertedIMG(imageURL);
            setFetchIMGCompleted(true)
        } else {
            setConvertedIMG('https://staticsmaker.iplsc.com/smaker_production_2021_11_24/d9d5fac2c9271afdbc7205b695742eca-lg.jpg');
        }

    }, [drinkIMGs]);

    return (

        <div className="mb-3 ms-3 d-flex align-items-center drinks-profile-holder  me-3  justify-content-between ">
            <div className="d-flex align-items-center flex-column flex-xl-row justify-content-center">
                <div className="ms-3 me-4 fs-4">
                    {elm.ID_DRINK}.
                </div>
                <div className="justify-content-between d-flex align-items-center position-relative ">
                    <div className="d-flex align-items-center flex-xxl-row flex-column ">
                        <div className="d-flex align-items-center data-holder ">
                            <div className=" mt-1 mb-1 drink-profile-holder-IMG">
                                {fetchIMGCompleted ? (
                                    <img className=" drink-profile-img img-fluid " src={convertetIMG} alt="loadingErr"></img>

                                ) : (
                                    <div className="ps-4 pe-4 pb-4 pt-4">
                                        <Ring
                                            size={155}
                                            lineWeight={3}
                                            speed={2}
                                            color="black"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="ms-4 drink-name-profile">
                                {elm.DrinkName}
                            </div>
                            <div className="ms-4 fs-5">
                                Created by:
                                <label className="drink-name-profile ms-2">{elm.Creator}</label>
                            </div>
                        </div>
                        <div className="details-button-holder d-flex mt-xl-3 mb-xl-0 mb-3 flex-column flex-xl-row align-items-center ">
                            <button className="details-button">
                                <Link to={`/drinkDetail/${elm.ID_DRINK}`} target="_blank">show me the details</Link>
                            </button>

                            <div className="d-flex delete-profile">
                                <div className="block-icon-profile me-3">
                                    <svg lassName="block-icon-profile" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-60q142.375 0 241.188-98.812Q820-337.625 820-480q0-60.662-21-116.831Q778-653 740-699L261-220q45 39 101.493 59.5Q418.987-140 480-140ZM221-261l478-478q-46-39-102.169-60T480-820q-142.375 0-241.188 98.812Q140-622.375 140-480q0 61.013 22 117.507Q184-306 221-261Z" /></svg>
                                </div>
                                <div className="delete-profile-icon">
                                    <svg lassName="delete-profile-icon " xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default DrinksProfile;