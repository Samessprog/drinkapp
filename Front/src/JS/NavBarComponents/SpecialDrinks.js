import React, { Suspense } from "react";
import { v4 as uuid } from 'uuid';
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "../Components/ErrorBoundary";
const Ingreadinet = React.lazy(() => import("./Ingreadinet"))

function SpecialDrinks({ searchingDrink, setSearchingDrink, setSpecialOptionsPopup, ingredient, ingredientText,
    setIngredientText, setingredient, drinkDatas }) {
        
    const [drinkCounter, setDrinkCounter] = React.useState(0)

    React.useEffect(() => {

        const result = searchingDrink.filter((elm) => {
            let match = false;

            for (const elmIng of ingredient) {

                const ingredientName = elm.Ingredients.toLowerCase();
                const inputText = elmIng.text.toLowerCase();

                if (ingredientName.includes(inputText)) {
                    match = true;
                    break;
                }
            }
            return match;
        });

        setDrinkCounter(result.length)
        setSearchingDrink(result.length === 0 ? drinkDatas : result)

    }, [ingredient])

    

    
    const inputTextHandler = (event) => {
        setIngredientText(event.target.value)
    }

    const submitIngreadinetsHandler = () => {

        setingredient([
            ...ingredient,
            { text: ingredientText, id: uuid() }
        ])
        setIngredientText("")
    }


    return (
        <div className="special-drinks-holder position-fixed col-12 col-md-10 mt-5">
            <div className="col-6 helper rounded p-3">
                <div className="d-flex flex-row-reverse ">
                    <svg onClick={() => setSpecialOptionsPopup(false)} className="close-icon" xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                        <path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z" />
                    </svg>
                </div>
                <div className="flex-column  mt-3 d-none d-sm-flex">
                    <label className="d-flex justify-content-center fs-5 fw-bolder">Note:</label>
                    Please enter the ingredients you have and then click ENTER.If you want to delete a component, click X.
                </div>

                <div className="mb-4  d-flex mt-4">

                    <input value={ingredientText} onChange={inputTextHandler} className="col-lg-6 ps-1 ingredients-input rounded  " type="text" placeholder="ingredient"></input>
                    <button onClick={submitIngreadinetsHandler} className="rounded ms-1 ms-sm-2 enter-button " type="button">Enter</button>

                </div>


                <div className="mb-3 col-xl-10 test overflow-auto pe-2">

                    <ul className="ms-0  ">
                        {ingredient.map((ing, key) => (
                            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                                <Suspense>
                                    <Ingreadinet ing={ing} key={key} setingredient={setingredient} ingredient={ingredient} />
                                </Suspense>
                            </ErrorBoundary>
                        ))}

                    </ul>

                </div>

                <div className="d-flex flex-column  justify-content-between align-items-center ">
                    <label>The amount of drinks we have with these ingredients:</label>
                    <label className="drink-results mt-1 mb-1  d-flex justify-content-center ">{drinkCounter}</label>

                </div>

            </div>


        </div>

    )
}


export default SpecialDrinks;