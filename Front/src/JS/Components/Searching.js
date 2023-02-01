import React from "react";

function Searching({ alcocholic, setAlcocholic, softDrinks, setSoftDrinks, setDrinkLevel,
  highlyRated, setHighlyRated, drinkLevel, drinkTaste, setDrinkTaste, drinkDatas,
  setSearchingDrink, searchingDrink, setDrinkNotFound, inputDrinkText }) {

  React.useEffect(() => {
    const filterDrinks = () => {
      let results = searchingDrink.filter((elm) => {

        if (alcocholic && elm.DrinkType === 'Alcocholic' || softDrinks && elm.DrinkType === 'Soft' || !alcocholic && !softDrinks) {
          if (drinkLevel === 'All' || drinkLevel === elm.DifficultyLevel) {
            if (drinkTaste === 'All' || drinkTaste === elm.Taste) {
              return elm;
            }
          }
        }
      });

      if (highlyRated) {
        results.sort((firstDrink, secDrink) => secDrink.Rate - firstDrink.Rate);
      }

      setSearchingDrink(results);
    };

    const searchDrinks = async () => {

      if (inputDrinkText) {
        const searchingResults = searchingDrink.filter((elm) => {
          const drinkName = elm.DrinkName.toLowerCase();
          const inputText = inputDrinkText.toLowerCase();

          if (drinkName.includes(inputText)) {
            return elm;
          }
        });

        setSearchingDrink(searchingResults);
      }

    };

    filterDrinks();
    searchDrinks();

    if (inputDrinkText === '') {
      filterDrinks()
      setSearchingDrink(drinkDatas)
    }

  }, [alcocholic, softDrinks, highlyRated, drinkLevel, drinkTaste, inputDrinkText, setSearchingDrink, drinkDatas]);

  React.useEffect(() => {
    setDrinkNotFound(searchingDrink.length === 0);
  }, [searchingDrink, setDrinkNotFound]);

}

export default Searching;

