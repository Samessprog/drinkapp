import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';

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
        <div className="mb-3 ms-3 d-flex align-items-center drinks-profile-holder  me-3  justify-content-between">
            <div className="d-flex  align-items-center">
                <div className="ms-3 me-4 fs-4">
                    {elm.ID_Drink}.
                </div>
                <div className="justify-content-between d-flex align-items-center position-relative">
                    <div className="d-flex align-items-center ">
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
                        <div className=" details-button-holder ">
                            <button className="details-button">show me the details</button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="d-flex  delete-profile me-4">
                X
            </div>
        </div>
    )


}
export default DrinksProfile;