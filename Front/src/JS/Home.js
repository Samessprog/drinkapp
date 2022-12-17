import React from "react";
import SpecialDrinks from "./NavBarComponents/SpecialDrinks";
import MainPage from "./MainPage";

export default function Home({ searchingDrink,setingredient, specialOptionsPopup, drinkDetailsPopup, drinkDatas, userScroll, setDrinkDetailsPopup, ingredientText, setIngredientText, ingredient, setSpecialOptionsPopup }) {

    return (

        <div>

            {specialOptionsPopup &&

                <SpecialDrinks
                    ingredientText={ingredientText}
                    setIngredientText={setIngredientText}
                    ingredient={ingredient}
                    setingredient={setingredient}
                    setSpecialOptionsPopup={setSpecialOptionsPopup}

                />
            }

            <MainPage
                setDrinkDetailsPopup={setDrinkDetailsPopup}
                userScroll={userScroll}
                drinkDatas={drinkDatas}
                drinkDetailsPopup={drinkDetailsPopup}
                searchingDrink={searchingDrink}
            />
            
        </div>
    )
}

