import React from "react";

function Searching({ alcocholic, softDrinks, highlyRated, drinkLevel, drinkTaste, drinkDatas,
  setSearchingDrink, inputDrinkText }) {

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

}

export default Searching;