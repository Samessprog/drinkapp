import React from "react";
import NavBar from "./NavBarComponents/NavBar";
import DrinkDetails from "./drinksComponents/DrinkDetails";
import Footer from "./footer/Footer";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Route, Routes } from "react-router-dom"
import Home from "./Home";


function App() {


  //navbar PopUps
  const [Popupsetings, setPopupSetings] = React.useState(false)
  const [loginPopup, setLoginPopup] = React.useState(false)
  const [specialOptionsPopup, setSpecialOptionsPopup] = React.useState(false)

  //Searching
  const [searchingDrink, setSearchingDrink] = React.useState([])


  const [userScroll, setUserScroll] = React.useState(false);

  //Special drinks hooks
  const [ingredientText, setIngredientText] = React.useState("")
  const [ingredient, setingredient] = React.useState([])

  //Drink details (zrobić inaczej)
  const [drinkDetailsPopup, setDrinkDetailsPopup] = React.useState(false)


  const setFixed = () => {
    if (window.scrollY >= 1) {
      setUserScroll(true)

    } else {
      setUserScroll(false)
    }
  }

  window.addEventListener("scroll", setFixed)

  const [drinkDatas, setDrinkData] = React.useState([])

  React.useEffect(() => {

    const fetchData = async () => {
      try {
        const datas = await fetch("http://localhost:3000/api.php")
        const drinkData = await datas.json();
        setDrinkData(drinkData)
        setSearchingDrink(drinkData)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData();
  }, [])

  
  return (
    <div className=".container-fluid">


      <NavBar

        Popupsetings={Popupsetings}
        setPopupSetings={setPopupSetings}
        loginPopup={loginPopup}
        setLoginPopup={setLoginPopup}
        setSpecialOptionsPopup={setSpecialOptionsPopup}
        specialOptionsPopup={specialOptionsPopup}
        userScroll={userScroll}
        drinkDatas={drinkDatas}

        searchingDrink={searchingDrink}
        setSearchingDrink={setSearchingDrink}


      />



      <Routes>
        <Route path="/" element={

          <Home

          searchingDrink={searchingDrink}

            ingredientText={ingredientText}
            setIngredientText={setIngredientText}
            ingredient={ingredient}
            setingredient={setingredient}
            setSpecialOptionsPopup={setSpecialOptionsPopup}
            specialOptionsPopup={specialOptionsPopup}

            setDrinkDetailsPopup={setDrinkDetailsPopup}
            userScroll={userScroll}
            drinkDatas={drinkDatas}
            drinkDetailsPopup={drinkDetailsPopup}

          />}>


        </Route>

        <Route path="/drinkDetail/:id" element={<DrinkDetails  drinkDatas={drinkDatas} />}></Route>

      </Routes>

      <Footer />

    </div>
  );
}

export default App;
