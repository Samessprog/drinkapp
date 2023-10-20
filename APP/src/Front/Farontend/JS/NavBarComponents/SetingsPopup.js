//Imports
import { useDispatch, useSelector } from 'react-redux';

import Searching from "../Components/Searching";
import DrinksOptions from "../drinksComponents/DrinksOptions";
import TypeOfDrink from "../drinksComponents/TypeOfDrink";
import { setHighlyRated, setDrinkFavouriteFlag } from "../States/actions";

function SetingsPopup({ setSpecialOptionsPopup, setPopupSetings, specialOptionsPopup, searchingDrink,
    drinkDatas, setSearchingDrink, setDrinkNotFound }) {

    const favouriteDrink = useSelector(state => state.drink.favouriteDrink);
    const eachdrinkflag = useSelector(state => state.drink.eachdrinkflag);
    const dispatch = useDispatch();

    //Drinks properties states
    const highlyRated = useSelector(state => state.drink.highlyRated);

    return (
        <div className="position-fixed SetingsPopupHolder col-12">

            <Searching
                highlyRated={highlyRated}
                drinkDatas={drinkDatas}
                setSearchingDrink={setSearchingDrink}
                searchingDrink={searchingDrink}
                setDrinkNotFound={setDrinkNotFound}
                eachdrinkflag={eachdrinkflag}
            />

            <div className="d-flex flex-row-reverse me-2 mt-2 ">
                <svg
                    className="close-icon" onClick={() => dispatch(setPopupSetings(false))}
                    xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
            </div>
            <div className="ms-2 p-2 pe-3 ">
                <div className="d-flex justify-content-center fs-5 ">Filter</div>
                <div className="options-holder-settings-popup  mt-3 d-flex font col-12">
                    <div className="col-6">
                        <div className="d-flex mt-1">
                            <input
                                type="checkbox"
                                id="favoriteCheckbox"
                                onClick={() => dispatch(setDrinkFavouriteFlag(!favouriteDrink))}
                            />
                            <label
                                htmlFor="favoriteCheckbox"
                                className="ms-2"
                            >
                                Favorite
                            </label>
                        </div>
                        <TypeOfDrink />
                        <div className="d-flex mt-1">
                            <input
                                id='highlyRatedCheckbox'
                                value={highlyRated}
                                type="checkbox"
                                onClick={() => dispatch(setHighlyRated(!highlyRated))}
                                className={highlyRated ? 'checked' : 'unchecked'}
                            >
                            </input>
                            <label htmlFor='highlyRatedCheckbox' className="ms-2">Highly rated </label>
                        </div>
                    </div>
                    <DrinksOptions />
                </div>
                <div className="d-flex justify-content-center mt-3 advanced-button-holder">
                    <button onClick={() => {
                        dispatch(setSpecialOptionsPopup(!specialOptionsPopup))
                        dispatch(setPopupSetings(false))
                    }}
                        className="rounded-pill btn btn-secondary bg-transparent border rounded d-flex p-2 ps-3 pe-3 mt-2">
                        <svg className="me-1 fill-color-212 ms-2 me-2 advancet-filter-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" /></svg>
                        <div className="pe-2">Advanced filtering</div>
                    </button>
                </div>
            </div>
        </div>

    ) 

}


export default SetingsPopup;