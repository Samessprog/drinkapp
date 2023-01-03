import React, { Suspense} from "react";
import MainPage from "./MainPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./Components/ErrorBoundary";

const SpecialDrinks = React.lazy(() => import("./NavBarComponents/SpecialDrinks"))


export default function Home({ searchingDrink,  setSearchingDrink ,setingredient, specialOptionsPopup, drinkDetailsPopup,
    drinkDatas, userScroll, setDrinkDetailsPopup, ingredientText, setIngredientText,
    ingredient, setSpecialOptionsPopup, drinkNotFound,drinksCounter,setDrinksCounter }) {

       
      
      

    return (

        <div>

            {specialOptionsPopup &&
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>{}}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SpecialDrinks
                            ingredientText={ingredientText}
                            setIngredientText={setIngredientText}
                            ingredient={ingredient}
                            setingredient={setingredient}
                            setSpecialOptionsPopup={setSpecialOptionsPopup}
                            searchingDrink = { searchingDrink}
                            setSearchingDrink = {setSearchingDrink}
                            drinksCounter= {drinksCounter}
                            setDrinksCounter = {setDrinksCounter}
                            drinkDatas={drinkDatas}
                        />
                    </Suspense>
                </ErrorBoundary>
            }

            <MainPage
                setDrinkDetailsPopup={setDrinkDetailsPopup}
                userScroll={userScroll}
                drinkDatas={drinkDatas}
                drinkDetailsPopup={drinkDetailsPopup}
                searchingDrink={searchingDrink}
                drinkNotFound={drinkNotFound}
            />

        </div>
    )
}

