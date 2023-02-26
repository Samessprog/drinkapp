import React from "react";

function Searching({ alcocholic, softDrinks, highlyRated, drinkLevel, drinkTaste, drinkDatas,
  setSearchingDrink, searchingDrink, setDrinkNotFound, inputDrinkText }) {


  React.useEffect(() => {

    const filterDrinks = () => {

      setSearchingDrink(drinkDatas)  
      console.log(drinkDatas)
      console.log(searchingDrink)
    
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


    const drinkInput = async () => {

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
    drinkInput();


    if (inputDrinkText === '') {
      filterDrinks()
      setSearchingDrink(drinkDatas)
    }


  }, [alcocholic, softDrinks, highlyRated, drinkLevel, drinkTaste, inputDrinkText]);















  React.useEffect(() => {
    setDrinkNotFound(searchingDrink.length === 0);
  }, [searchingDrink, setDrinkNotFound]);

}

export default Searching;

