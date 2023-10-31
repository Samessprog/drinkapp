//Imports
import FetchingDrinkIMG from "../../drinksComponents/FetchingDrinkIMG";

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
        <div className={`mb-4 ms-3 me-3 d-flex align-items-center ustify-content-center drinks-profile-holder col-12  ${hiddenElements.includes(elm.ID_DRINK) ? 'd-none' : ''} `}>
            <div className="d-flex align-items-center flex-column flex-xl-row justify-content-center col-12">
                <div className="ms-5 fs-4 col-1 ">
                    {elm.ID_DRINK}.
                </div>
                <div className="justify-content-between d-flex align-items-center col-11">
                    <div className="d-flex align-items-center flex-xxl-row flex-column col-12">
                        <div className="d-flex align-items-center data-holder col-8">
                            <FetchingDrinkIMG elm={elm} classNameHolder='mt-3 mb-3 ms-4 drink-profile-holder-IMG ' classNameIMG='drink-profile-img img-fluid' />
                            <div className="ms-4 drink-name-profile col-5">
                                {elm.DrinkName}
                            </div>
                            <div className="ms-4 fs-5 col-5 ">
                                <div className="d-flex">
                                    <label>Created by: </label>
                                    <label className="drink-name-profile ms-2">{elm.Creator}</label>
                                </div>
                                <div className="d-flex">
                                    <label className="me-2">Difficult: </label>
                                    <label className={elm.DifficultyLevel === 'Easy' ? 'easyLevelClass ' : elm.DifficultyLevel === 'Medium' ? 'mediumLevelClass ' : elm.DifficultyLevel === 'Hard' ? 'hardLevelClass ' : ''}>{elm.DifficultyLevel}</label>
                                </div>
                                <div className="d-flex">
                                    <label className="me-2">Taste: </label>
                                    <label className={elm.Taste === 'Sour' ? 'sourClass ' : elm.Taste === 'Sweet' ? 'sweetClass ' : elm.Taste === 'Bitter' ? 'bitterClass' : ''} >{elm.Taste}</label>
                                </div>
                                <div className="d-flex">
                                    <label>Type: </label>
                                    <label className={ `ms-2 ${elm.DrinkType === 'Soft' ? 'softClass' : 'alkoClass '}`} >{elm.DrinkType}</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="d-flex delete-profile me-5 pb-2 col-12 d-flex align-items-center">
                                {showNewsFlag ? (
                                    <div className="me-3" onClick={acceptDrink}>
                                        <svg className="accept-derink-icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" /></svg>
                                    </div>
                                ) : (
                                    <div className=" me-3 d-flex justify-content-center mt-4 align-items-center" onClick={() => setDrinkPreview({ isOpenPrev: true, Drink: elm })}>
                                        <button className="mb-md-2 ms-1 rounded-pill btn btn-secondary border rounded d-flex p-2 change-data-input-user">
                                            <svg className="me-1  ms-2 me-2" xmlns="http://www.w3.org/2000/svg" height="24" width="24" style={{ fill: "white" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z" /></svg>                                    </svg>
                                            <div className="pe-2">change data</div>
                                        </button>
                                    </div>
                                )}
                                <div className="delete-profile-icon me-5" onClick={() => { setWindowAlert({ isOpen: !windowAlert.isOpen, ObjectID: elm }) }}>
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