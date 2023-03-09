import React from "react";

function Searching({ alcocholic, softDrinks, highlyRated, drinkLevel, drinkTaste, drinkDatas,
  setSearchingDrink, searchingDrink, inputDrinkText }) {

    
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

      setSearchingDrink(results)
    };

    const drinkInput = () => {

      if (inputDrinkText) {
        const searchingResults = drinkDatas.filter((elm) => {
          const drinkName = elm.DrinkName.toLowerCase();
          const inputText = inputDrinkText.toLowerCase();

          if (drinkName.includes(inputText)) {
            return elm;
          }

        });

        setSearchingDrink(searchingResults);
        console.log(searchingDrink)
      }

      if (inputDrinkText === '') {
        filterDrinks()
        setSearchingDrink(drinkDatas)
      }

    };

    filterDrinks();
    drinkInput();

  }, [alcocholic, softDrinks, highlyRated, drinkLevel, drinkTaste, inputDrinkText]);

}

export default Searching;

