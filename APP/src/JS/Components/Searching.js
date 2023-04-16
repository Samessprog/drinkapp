import React from "react";

function Searching({ alcocholic, softDrinks, highlyRated, drinkLevel, drinkTaste, drinkDatas,
  setSearchingDrink, inputDrinkText, ingredient, eachdrinkflag, setDrinkCounter }) {

  const filterDrinks = (drinkDatas, inputDrinkText, alcocholic, softDrinks, drinkLevel, drinkTaste, ingredient) => {

    return drinkDatas.filter((elm) => {

      const isCategoryMatch = (alcocholic && elm.DrinkType === 'Alcocholic') || (softDrinks && elm.DrinkType === 'Soft') || (!alcocholic && !softDrinks);
      const isDifficultyLevelMatch = drinkLevel === 'All' || drinkLevel === elm.DifficultyLevel;
      const isTasteMatch = drinkTaste === 'All' || drinkTaste === elm.Taste;
      const drinkIngredients = elm.Ingredients.toLowerCase();
      const hasMatchingIngredientSome = ingredient.some((ing) => drinkIngredients.includes(ing.text.toLowerCase()));
      const areAllIngredientsIncluded = ingredient.every((ing) => drinkIngredients.includes(ing.text.toLowerCase()));

      //Do optymalizacji i dokończenia
      if (inputDrinkText) {
        const drinkName = elm.DrinkName?.toLowerCase();
        const inputText = inputDrinkText.toLowerCase();

        if ((drinkName.includes(inputText) && isCategoryMatch && isDifficultyLevelMatch && isTasteMatch && ingredient.length === 0)) {
          return elm
        }

      } else if (!inputDrinkText && isCategoryMatch && isDifficultyLevelMatch && isTasteMatch && ingredient.length === 0) {
        return elm

      } else if (!inputDrinkText && isCategoryMatch && isDifficultyLevelMatch && isTasteMatch && ingredient.length !== 0) {
        if (eachdrinkflag) {
          if (hasMatchingIngredientSome) { return elm }
        } else {
          if (areAllIngredientsIncluded) { return elm }
        }

      } else if (!inputDrinkText && !(isCategoryMatch && isDifficultyLevelMatch && isTasteMatch) && ingredient.length !== 0) {
        return elm
      }  //else {
      //   if (eachdrinkflag) {
      //     if (hasMatchingIngredientSome) { return elm }
      //   } else if (!eachdrinkflag) {
      //     if (areAllIngredientsIncluded) { return elm }
      //   }
      // }
    });
  };



  React.useEffect(() => {
    const searchingResults = filterDrinks(drinkDatas, inputDrinkText, alcocholic, softDrinks, drinkLevel, drinkTaste, ingredient);
    if (highlyRated) {
      searchingResults.sort((firstDrink, secDrink) => secDrink.Rate - firstDrink.Rate);
    }
    setSearchingDrink(searchingResults);
  }, [alcocholic, softDrinks, highlyRated, drinkLevel, drinkTaste, inputDrinkText, ingredient, eachdrinkflag]);

}

export default Searching;