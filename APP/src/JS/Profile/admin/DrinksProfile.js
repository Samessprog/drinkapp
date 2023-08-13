import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { Link } from "react-router-dom";

function DrinksProfile({ elm }) {

    const [drinkProfileIMG, setdrinkProfileIMG] = useState('')

    useEffect(() => {
        if (elm.IMG && elm.IMG.data) {
            // Convert the image data to base64
            const base64Image = Buffer.from(elm.IMG.data).toString('base64');
            // Create the image URL using the base64 data
            const imageURL = `data:image/jpeg;base64,${base64Image}`;
            setdrinkProfileIMG(imageURL);
        }

    }, []);



    return (

        <div className="mb-3 ms-3 d-flex align-items-center drinks-profile-holder  me-3  justify-content-between ">
            <div className="d-flex align-items-center ">
                <div className="ms-3 me-4 fs-4">
                    {elm.ID_Drink}.
                </div>
                <div className="justify-content-between d-flex align-items-center position-relative ">
                    <div className="d-flex align-items-center flex-xxl-row flex-column ">
                        <div className="d-flex align-items-center data-holder ">
                            <div className=" mt-1 mb-1 drink-profile-holder-IMG">
                                <img className=" drink-profile-img img-fluid " src={drinkProfileIMG} alt="loadingErr"></img>
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
                                <Link to={`/drinkDetail/${elm.ID_Drink}`} target="_blank">show me the details</Link>
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