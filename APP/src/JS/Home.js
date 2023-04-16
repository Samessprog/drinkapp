import React, { Suspense } from "react";
import MainPage from "./MainPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./Components/ErrorBoundary";


const SpecialDrinks = React.lazy(() => import("./NavBarComponents/SpecialDrinks"))


export default function Home({ searchingDrink, specialOptionsPopup, setSearchingDrink, setingredient,
    drinkDatas, userScroll, ingredientText, setIngredientText,
    ingredient, setSpecialOptionsPopup, offset, setOffset,  drinkCounter, setDrinkCounter, eachdrinkflag, setEachdrinkflag }) {

        
    return (

        <div>

            {specialOptionsPopup &&
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SpecialDrinks
                            ingredientText={ingredientText}
                            setIngredientText={setIngredientText}
                            ingredient={ingredient}
                            setingredient={setingredient}
                            setSpecialOptionsPopup={setSpecialOptionsPopup}
                            searchingDrink={searchingDrink}
                            setSearchingDrink={setSearchingDrink}
                            drinkDatas={drinkDatas}
                            
                            drinkCounter={drinkCounter}
                            setDrinkCounter={setDrinkCounter}
                            eachdrinkflag={eachdrinkflag}
                            setEachdrinkflag={setEachdrinkflag}
                        />
                    </Suspense>
                </ErrorBoundary>
            }

            <MainPage
                userScroll={userScroll}
                drinkDatas={drinkDatas}
                searchingDrink={searchingDrink}
                offset={offset}
                setOffset={setOffset}

            />

        </div>
    )
}

