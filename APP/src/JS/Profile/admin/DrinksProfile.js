import React from "react";
import FetchingDrinkIMG from "../../Components/FetchingDrinkIMG";

function DrinksProfile({ elm, setWindowAlert, windowAlert, setAnnouncementSucces, hiddenElements, showNewsFlag, setDrinkPreview }) {
    const API_URL = 'http://localhost:3000/api/';

    const acceptDrink = async () => {

        let drinkID = elm.ID_DRINK;

        try {
            const response = await fetch(`${API_URL}acceptDrinksByAdmin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ drinkID }),
            });
            const data = await response.json();
            if (response.status === 200 || data.message === 'User block successfully') {
                setAnnouncementSucces(true)
            } else if (response.status === 404 && data.error === 'User not found') {
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (

        <div className={`mb-3 ms-3  d-flex align-items-center drinks-profile-holder  justify-content-between col-11 ${hiddenElements.includes(elm.ID_DRINK) ? 'd-none' : ''} `}>

            <div className="d-flex align-items-center flex-column flex-xl-row justify-content-center col-12">
                <div className="ms-5 fs-4 col-1 ">
                    {elm.ID_DRINK}.
                </div>

                <div className="justify-content-between d-flex align-items-center position-relative col-11">
                    <div className="d-flex align-items-center flex-xxl-row flex-column col-12">
                        <div className="d-flex align-items-center data-holder ">
                            <FetchingDrinkIMG elm={elm} classNameHolder='mt-3 mb-3 ms-4 drink-profile-holder-IMG' classNameIMG='drink-profile-img img-fluid' />
                            <div className="ms-4 drink-name-profile">
                                {elm.DrinkName}
                            </div>
                            <div className="ms-4 fs-5">
                                Created by:
                                <label className="drink-name-profile ms-2">{elm.Creator}</label>
                            </div>
                        </div>
                        <div className="details-button-holder d-flex mt-xl-3 mb-xl-0 mb-3 flex-column flex-xl-row align-items-center ">
                            <button className="details-button ">
                                <label onClick={() => setDrinkPreview({ isOpenPrev:true, Drink:elm })}>show me the details</label>
                            </button>

                            <div className="d-flex delete-profile me-5 pb-2">
                                {showNewsFlag ? (
                                    <div className="me-3" onClick={acceptDrink}>
                                        <svg className="accept-derink-icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" /></svg>
                                    </div>
                                ) : (
                                    <div className="block-icon-profile me-3">
                                        <svg className="block-icon-profile" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z" /></svg>
                                    </div>
                                )}

                                <div className="delete-profile-icon" onClick={() => { setWindowAlert({ isOpen: !windowAlert.isOpen, ObjectID: elm }) }}>
                                    <svg className="delete-profile-icon " xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" /></svg>
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