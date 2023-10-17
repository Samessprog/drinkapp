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
        <div className="position-fixed SetingsPopupHolder col-10 col-sm-5  col-md-4 col-xl-3 ">

            <Searching
                highlyRated={highlyRated}
                drinkDatas={drinkDatas}
                setSearchingDrink={setSearchingDrink}
                searchingDrink={searchingDrink}
                setDrinkNotFound={setDrinkNotFound}
                eachdrinkflag={eachdrinkflag}
            />

            <div className="d-flex flex-row-reverse me-2 mt-2 ">
                <svg className="close-icon" onClick={() => dispatch(setPopupSetings(false))} xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                    <path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z" />
                </svg>
            </div>
            <div className="ms-2 mt-1 p-2 pe-3 ">

                <div className="d-flex justify-content-center fs-5 ">Settings</div>

                <div className="options-holder-settings-popup  mt-3 d-flex font ">

                    <div className="">
                        <div className="d-flex mt-1">
                            <input type="checkbox" onClick={() => dispatch(setDrinkFavouriteFlag(!favouriteDrink))} ></input>
                            <label className="ms-1">Favorite</label>
                        </div>

                        <TypeOfDrink />

                        <div className="d-flex mt-1">
                            <input
                                value={highlyRated}
                                type="checkbox"
                                onClick={() => dispatch(setHighlyRated(!highlyRated))}
                                className={highlyRated ? 'checked' : 'unchecked'}
                            >
                            </input>
                            <label className="ms-1">Highly rated </label>
                        </div>

                    </div>
                    <DrinksOptions />
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button onClick={() => {
                        dispatch(setSpecialOptionsPopup(!specialOptionsPopup))
                        dispatch(setPopupSetings(false))
                    }}
                        type="button" className=" special-button rounded">
                        Provide the ingredients
                    </button>
                </div>
            </div>
        </div>

    )

}


export default SetingsPopup;