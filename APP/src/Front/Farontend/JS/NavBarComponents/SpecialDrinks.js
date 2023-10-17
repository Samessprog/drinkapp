//Imports
import { Suspense, lazy, useState } from "react";
import { v4 as uuid } from 'uuid';
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from 'react-redux';

import { setEachdrinkflag, setingredient } from "../States/actions";
import Searching from "../Components/Searching";
import ErrorFallback from "../ErrorsComponents/ErrorBoundary";
const Ingreadinet = lazy(() => import("../drinksComponents/Ingreadinet"))

function SpecialDrinks({ setSearchingDrink, setSpecialOptionsPopup, drinkDatas, setDrinkNotFound }) {

    const dispatch = useDispatch();

    const eachdrinkflag = useSelector(state => state.drink.eachdrinkflag)
    const drinkCounter = useSelector(state => state.drink.drinkCounter)
    const ingredient = useSelector(state => state.drink.ingredient)
    const [ingredientText, setIngredientText] = useState("")

    const submitIngreadinetsHandler = () => {
        dispatch(setingredient([
            ...ingredient,
            { text: ingredientText, id: uuid() }
        ]))
        setIngredientText("")
    }

    return (
        <div className="special-drinks-holder position-fixed col-12 col-md-10 mt-5" style={{ textAlign: "center" }}>

            <Searching
                ingredient={ingredient}
                setDrinkNotFound={setDrinkNotFound}
                eachdrinkflag={eachdrinkflag}
                drinkDatas={drinkDatas}
                setSearchingDrink={setSearchingDrink}
            />

            <div className="col-10 helper rounded p-3" style={{ margin: "auto" }}>
                <div className="d-flex flex-row-reverse ">
                    <svg onClick={() => dispatch(setSpecialOptionsPopup(false))} className="close-icon" xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                        <path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z" />
                    </svg>
                </div>
                <div className="flex-column  mt-3 d-none d-sm-flex">
                    <label className="d-flex justify-content-center fs-5 fw-bolder">Note:</label>
                    Please enter the ingredients you have and then click ENTER.If you want to delete a component, click X.
                </div>

                <div className="mb-4  d-flex mt-4 justify-content-center">

                    <input value={ingredientText} onChange={(event) => setIngredientText(event.target.value)} className="col-8  col-sm-6 col-lg-6 ps-1 ingredients-input rounded  " type="text" placeholder="ingredient"></input>
                    <button onClick={submitIngreadinetsHandler} className="col-3 col-sm-1   rounded ms-1 ms-sm-2 enter-button " type="button">Enter</button>

                </div>
                <div className="d-flex justify-content-center  align-items-center">
                    <input type="checkbox" onClick={() => dispatch(setEachdrinkflag(!eachdrinkflag))} /> <label className="ms-1">search for ALL drinks with the given ingredients</label>
                </div>
                <div className=" col-7 test overflow-auto pe-2">

                    <ul className="ms-0  ">
                        {ingredient.map((ing) => (
                            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }} key={ing.id}>
                                <Suspense>
                                    <Ingreadinet ing={ing} key={ing.id} setingredient={setingredient} ingredient={ingredient} />
                                </Suspense>
                            </ErrorBoundary>
                        ))}
                    </ul>

                </div>

                <div className="d-flex flex-column  justify-content-between align-items-center ">

                    <label>The amount of drinks we have with these ingredients:</label>
                    <label className={`drink-results mt-1 mb-1 d-flex justify-content-center fs-3 fw-bold ${drinkCounter === 0 && 'text-danger'}`}>{drinkCounter}</label>

                </div>
            </div>
        </div>

    )
}


export default SpecialDrinks;