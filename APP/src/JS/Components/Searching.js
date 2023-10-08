//Imports
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDrinkCounter } from "../States/actions";

function Searching({ highlyRated, drinkDatas, setSearchingDrink, eachdrinkflag }) {

  const dispatch = useDispatch();
  //Downloading states from storage needed to search for drinks
  const alcocholic = useSelector(state => state.drink.alcocholic);
  const softDrinks = useSelector(state => state.drink.softDrinks);
  const drinkLevel = useSelector(state => state.drink.drinkLevel);
  const drinkTaste = useSelector(state => state.drink.drinkTaste);
  const ingredient = useSelector(state => state.drink.ingredient);
  const inputDrinkText = useSelector(state => state.navbar.inputDrinkText);
  const favouriteDrink = useSelector(state => state.drink.favouriteDrink);
  const userFavouriteDrinks = useSelector(state => state.user.userFavouriteDrinks);

  const filterDrinks = (drinkDatas, inputDrinkText, alcocholic, softDrinks, drinkLevel, drinkTaste, ingredient) => {

    return drinkDatas.filter((elm) => {

      //filtration conditions
      const isCategoryMatch = (alcocholic && elm.DrinkType === 'Alcoholic') || (softDrinks && elm.DrinkType === 'Soft') || (!alcocholic && !softDrinks);
      const isDifficultyLevelMatch = drinkLevel === 'All' || drinkLevel === elm.DifficultyLevel;
      const isTasteMatch = drinkTaste === 'All' || drinkTaste === elm.Taste;
      const drinkIngredients = elm.Ingredients.toLowerCase();
      const hasMatchingIngredientSome = ingredient.some((ing) => drinkIngredients.includes(ing.text.toLowerCase()));
      const areAllIngredientsIncluded = ingredient.every((ing) => drinkIngredients.includes(ing.text.toLowerCase()));

      if (inputDrinkText) {

        const drinkName = elm.DrinkName?.toLowerCase();
        const inputText = inputDrinkText.toLowerCase();
        const isMatch = drinkName.includes(inputText) && isCategoryMatch && isDifficultyLevelMatch && isTasteMatch;

        if (isMatch && !favouriteDrink && ingredient.length === 0) {
          return elm;
        }

        if (isMatch && !favouriteDrink && ingredient.length !== 0) {
          if (eachdrinkflag && hasMatchingIngredientSome) {
            return elm;
          }
          if (!eachdrinkflag && areAllIngredientsIncluded) {
            return elm;
          }
        }

        if (isMatch && favouriteDrink) {
          return userFavouriteDrinks.includes(elm.ID_DRINK);
        }
        return false;
      } else if (!inputDrinkText) {

        const isMatchWithoutText = isCategoryMatch && isDifficultyLevelMatch && isTasteMatch;

        if (isMatchWithoutText) {

          if (!favouriteDrink && ingredient.length !== 0) {
            if (eachdrinkflag && hasMatchingIngredientSome) {
              return elm;
            }
            if (!eachdrinkflag && areAllIngredientsIncluded) {
              return elm;
            }
          }

          if (!favouriteDrink) {
            if (ingredient.length === 0 || (eachdrinkflag && (hasMatchingIngredientSome || areAllIngredientsIncluded)) || areAllIngredientsIncluded) {
              return elm;
            }
          } else {
            if (ingredient.length === 0 || (eachdrinkflag && (hasMatchingIngredientSome || areAllIngredientsIncluded)) || areAllIngredientsIncluded) {
              return userFavouriteDrinks.includes(elm.ID_DRINK);
            }
          }
          //TU JEST BUG
        } else if (isMatchWithoutText && ingredient.length === 0 && (hasMatchingIngredientSome || areAllIngredientsIncluded)) {
          return elm;
        } else if (!isCategoryMatch && !isDifficultyLevelMatch && !isTasteMatch && ingredient.length === 0 && alcocholic === true && elm.DrinkType === 'Alcoholic') {
          return elm;
        }
        return false;
      } else {
        return elm
      }
    });
  };

  //execute when any variable downloaded from storage changes
  useEffect(() => {
    const searchingResults = filterDrinks(drinkDatas, inputDrinkText, alcocholic, softDrinks, drinkLevel, drinkTaste, ingredient);
    console.log(searchingResults)
    //filtering by rate value if the state changes
    if (highlyRated) {
      searchingResults.sort((firstDrink, secDrink) => secDrink.Rate - firstDrink.Rate);
    }
    dispatch(setDrinkCounter(searchingResults.length))

    setSearchingDrink(searchingResults);
  }, [alcocholic, softDrinks, highlyRated, drinkLevel, drinkTaste, inputDrinkText, ingredient, eachdrinkflag, favouriteDrink]);

}

export default Searching;