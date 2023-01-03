import React, {Suspense} from "react";
import { Route, Routes } from "react-router-dom"
import 'react-lazy-load-image-component/src/effects/blur.css';
import ErrorFallback from "./Components/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";

import NavBar from "./NavBarComponents/NavBar";
import Footer from "./footer/Footer";
import Home from "./Home";
import axios from 'axios';

const DrinkDetails = React.lazy(() => import("./drinksComponents/DrinkDetails"))

function App() {

  {/* Do FAKTORYZACJI */ }
  //navbar PopUps
  const [Popupsetings, setPopupSetings] = React.useState(false)
  const [loginPopup, setLoginPopup] = React.useState(false)
  const [specialOptionsPopup, setSpecialOptionsPopup] = React.useState(false)
  //Searching
  const [searchingDrink, setSearchingDrink] = React.useState([])
  //scroll
  const [userScroll, setUserScroll] = React.useState(false);
  //Special drinks hooks
  const [ingredientText, setIngredientText] = React.useState("")
  const [ingredient, setingredient] = React.useState([])
  //Drink details 
  const [drinkDetailsPopup, setDrinkDetailsPopup] = React.useState(false)
  //Drink datas
  const [drinkDatas, setDrinkData] = React.useState([])
  //isSet
  const [drinkNotFound, setDrinkNotFound] = React.useState(false)
  //Drinks counter
  const [drinksCounter, setDrinksCounter] = React.useState(0)

  React.useEffect(() => {
    const setFixed = () => {
      setUserScroll(window.scrollY >= 1);
    };
    window.addEventListener("scroll", setFixed);
  
    return () => window.removeEventListener("scroll", setFixed);
  }, []);


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api.php");
        setDrinkData(data);
        setSearchingDrink(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);



  return (
    <div className="">

      <NavBar
        Popupsetings={Popupsetings}
        setPopupSetings={setPopupSetings}
        loginPopup={loginPopup}
        setLoginPopup={setLoginPopup}
        specialOptionsPopup={specialOptionsPopup}
        setSpecialOptionsPopup={setSpecialOptionsPopup}
        drinkDatas={drinkDatas}
        searchingDrink={searchingDrink}
        setSearchingDrink={setSearchingDrink}
        userScroll={userScroll}
        setDrinkNotFound={setDrinkNotFound}
      />



      <Routes>
        <Route path="/" element={

          <Home
            drinkDatas={drinkDatas}
            searchingDrink={searchingDrink}
            ingredientText={ingredientText}
            ingredient={ingredient}
            setingredient={setingredient}
            setIngredientText={setIngredientText}
            setSpecialOptionsPopup={setSpecialOptionsPopup}
            specialOptionsPopup={specialOptionsPopup}
            setDrinkDetailsPopup={setDrinkDetailsPopup}
            drinkDetailsPopup={drinkDetailsPopup}
            userScroll={userScroll}
            drinkNotFound={drinkNotFound}
            setSearchingDrink={setSearchingDrink}
            drinksCounter= {drinksCounter}
            setDrinksCounter ={setDrinksCounter}

          />}>

        </Route>
        <Route path="/drinkDetail/:id" element={<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}> <Suspense fallback={<div>Loading...</div>}> <DrinkDetails drinkDatas={drinkDatas} /> </Suspense> </ErrorBoundary>}></Route>
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
