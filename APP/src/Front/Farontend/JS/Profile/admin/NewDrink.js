//Imports
import { Link } from "react-router-dom"
import FetchingDrinkIMG from "../../Components/FetchingDrinkIMG"

function NewDrink({ elm, setWindowAlert, windowAlert, hiddenDrinkElements }) {

    const { ID_DRINK, Creator } = elm

    return (
        <div className={`mb-3 ms-3  d-flex align-items-center drinks-profile-holder  justify-content-between col-11 ${hiddenDrinkElements.includes(ID_DRINK) ? 'd-none' : ''} `}>

            <div className="d-flex align-items-center flex-column flex-xl-row justify-content-center col-12">
                <div className="ms-5 fs-4 col-1 ">
                    {ID_DRINK}.
                </div>

                <div className="justify-content-between d-flex align-items-center position-relative col-11">
                    <div className="d-flex align-items-center flex-xxl-row flex-column col-12">
                        <div className="d-flex align-items-center data-holder ">
                            <FetchingDrinkIMG
                                ID_DRINK={ID_DRINK}
                                classNameHolder='mt-3 mb-3 ms-4 drink-profile-holder-IMG'
                                classNameIMG='drink-profile-img img-fluid'
                            />
                            <div className="ms-4 drink-name-profile">
                                {elm.DrinkName}
                            </div>
                            <div className="ms-4 fs-5">
                                Created by:
                                <label className="drink-name-profile ms-2">{Creator}</label>
                            </div>
                        </div>
                        <div className="details-button-holder d-flex mt-xl-3 mb-xl-0 mb-3 flex-column flex-xl-row align-items-center ">
                            <button className="details-button ">
                                <Link to={`/drinkDetail/${ID_DRINK}`} target="_blank">show me the details</Link>
                            </button>
                            <div className="d-flex delete-profile me-5 pb-2">
                                <div className="block-icon-profile me-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="48"
                                        viewBox="0 -960 960 960"
                                        width="48">
                                        <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
                                    </svg>
                                </div>
                                <div
                                    className="delete-profile-icon"
                                    onClick={() => { setWindowAlert({ isOpen: !windowAlert.isOpen, ObjectID: elm }) }}
                                >
                                    <svg
                                        className="delete-profile-icon "
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="48" viewBox="0 -960 960 960" width="48">
                                        <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewDrink