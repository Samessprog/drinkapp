import React from "react";

function Searching({ alcocholic, softDrinks, highlyRated, drinkLevel, drinkTaste, drinkDatas,
  setSearchingDrink, inputDrinkText, ingredient, setDrinkNotFound, eachdrinkflag, setDrinkCounter }) {

  const filterDrinks = (drinkDatas, inputDrinkText, alcocholic, softDrinks, drinkLevel, drinkTaste) => {

    //Do optymalizacji

    return drinkDatas.filter((elm) => {

      const isCategoryMatch = (alcocholic && elm.DrinkType === 'Alcocholic') || (softDrinks && elm.DrinkType === 'Soft') || (!alcocholic && !softDrinks);
      const isDifficultyLevelMatch = drinkLevel === 'All' || drinkLevel === elm.DifficultyLevel;
      const isTasteMatch = drinkTaste === 'All' || drinkTaste === elm.Taste;

      if (inputDrinkText) {
        const drinkName = elm.DrinkName?.toLowerCase();
        const inputText = inputDrinkText.toLowerCase();

        if ((drinkName.includes(inputText) && isCategoryMatch && isDifficultyLevelMatch && isTasteMatch)) {
          return elm
        }
      } else if (!inputDrinkText && isCategoryMatch && isDifficultyLevelMatch && isTasteMatch) {
        return elm
      }
    });
  };

  React.useEffect(() => {
    const searchingResults = filterDrinks(drinkDatas, inputDrinkText, alcocholic, softDrinks, drinkLevel, drinkTaste, highlyRated);
    if (highlyRated) {
      searchingResults.sort((firstDrink, secDrink) => secDrink.Rate - firstDrink.Rate);
    }
    setSearchingDrink(searchingResults);
  }, [alcocholic, softDrinks, highlyRated, drinkLevel, drinkTaste, inputDrinkText]);


  React.useEffect(() => {

    if (ingredient.length !== 0) {
        const result = drinkDatas.filter((drink) => {
            const drinkIngredients = drink.Ingredients.toLowerCase();

            if (eachdrinkflag) {
                return ingredient.some((ing) => drinkIngredients.includes(ing.text.toLowerCase()))
            } else { return ingredient.every((ing) => drinkIngredients.includes(ing.text.toLowerCase())) }

        });

        setDrinkCounter(result.length);
        setSearchingDrink(result);

        if (result.length === 0) {
            setDrinkNotFound(true)
        }

    } else { setSearchingDrink(drinkDatas) }

}, [ingredient, eachdrinkflag]);


}

export default Searching;