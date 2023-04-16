import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom"
import 'react-lazy-load-image-component/src/effects/blur.css';
import ErrorFallback from "./Components/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";


import { setSpecialOptionsPopup } from "./States/actions";
import NavBar from "./NavBarComponents/NavBar";
import Footer from "./footer/Footer";
import Home from "./Home";
import axios from 'axios';
import UserProfile from "./Profile/UserProfile";

const DrinkDetails = React.lazy(() => import("./drinksComponents/DrinkDetails"))

function App() {


  const specialOptionsPopup = useSelector(state => state.navbar.specialOptionsPopupp);



  //Drink details 
  const [drinkDetailsPopup, setDrinkDetailsPopup] = React.useState(false)
  //Drink datas
  const [drinkDatas, setDrinkData] = React.useState([])
  //isSet
  const [drinkNotFound, setDrinkNotFound] = React.useState(false)
  //Drinks counter
  const [drinksCounter, setDrinksCounter] = React.useState(0)

  //Searching
  const [searchingDrink, setSearchingDrink] = React.useState([])
  //scroll
  const [userScroll, setUserScroll] = React.useState(false);
  //Special drinks hooks
  const [ingredientText, setIngredientText] = React.useState("")
  const [ingredient, setingredient] = React.useState([])
  //Pagiantion offset
  const [offset, setOffset] = React.useState(0);
  //states for Searching comp
  const [alcocholic, setAlcocholic] = React.useState(false)
  const [softDrinks, setSoftDrinks] = React.useState(false)
  const [highlyRated, setHighlyRated] = React.useState(false)
  const [drinkLevel, setDrinkLevel] = React.useState('All')
  const [drinkTaste, setDrinkTaste] = React.useState('All')
  const [inputDrinkText, setInputDrinkText] = React.useState("");

  const [drinkCounter, setDrinkCounter] = React.useState(0)
  const [eachdrinkflag, setEachdrinkflag] = React.useState(false)



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
        const { data } = await axios.get("http://localhost:3001/drinks");
        //const data = await fetch("http://localhost:3000/api.php")
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
        setSpecialOptionsPopup={setSpecialOptionsPopup}
        drinkDatas={drinkDatas}
        searchingDrink={searchingDrink}
        setSearchingDrink={setSearchingDrink}
        userScroll={userScroll}
        setDrinkNotFound={setDrinkNotFound}
        drinkDetailsPopup={drinkDetailsPopup}
        alcocholic={alcocholic}
        setAlcocholic={setAlcocholic}
        inputDrinkText={inputDrinkText}
        setInputDrinkText={setInputDrinkText}
        softDrinks={softDrinks}
        setSoftDrinks={setSoftDrinks}
        highlyRated={highlyRated}
        setHighlyRated={setHighlyRated}
        drinkLevel={drinkLevel}
        setDrinkLevel={setDrinkLevel}
        drinkTaste={drinkTaste}
        setDrinkTaste={setDrinkTaste}
        drinkCounter={drinkCounter}
        setDrinkCounter={setDrinkCounter}
        eachdrinkflag={eachdrinkflag}
        setEachdrinkflag={setEachdrinkflag}
        ingredient={ingredient}

      />


      <Routes>
        <Route path="/" element={

          <Home
            setSpecialOptionsPopup={setSpecialOptionsPopup}
            drinkDatas={drinkDatas}
            searchingDrink={searchingDrink}
            ingredientText={ingredientText}
            ingredient={ingredient}
            setingredient={setingredient}
            setIngredientText={setIngredientText}
            specialOptionsPopup={specialOptionsPopup}
            setDrinkDetailsPopup={setDrinkDetailsPopup}
            drinkDetailsPopup={drinkDetailsPopup}
            userScroll={userScroll}
            drinkNotFound={drinkNotFound}
            setSearchingDrink={setSearchingDrink}
            drinksCounter={drinksCounter}
            setDrinksCounter={setDrinksCounter}
            offset={offset}
            setOffset={setOffset}
            setDrinkNotFound={setDrinkNotFound}
            alcocholic={alcocholic}
            setAlcocholic={setAlcocholic}
            inputDrinkText={inputDrinkText}
            setInputDrinkText={setInputDrinkText}
            softDrinks={softDrinks}
            setSoftDrinks={setSoftDrinks}
            highlyRated={highlyRated}
            setHighlyRated={setHighlyRated}
            drinkLevel={drinkLevel}
            setDrinkLevel={setDrinkLevel}
            drinkTaste={drinkTaste}
            drinkCounter={drinkCounter}
            setDrinkCounter={setDrinkCounter}
            eachdrinkflag={eachdrinkflag}
            setEachdrinkflag={setEachdrinkflag}

          />}>

        </Route>
        <Route path="/drinkDetail/:id" element={<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}> <Suspense fallback={<div>Loading...</div>}> <DrinkDetails searchingDrink={searchingDrink} offset={offset} setOffset={setOffset} /> </Suspense> </ErrorBoundary>}></Route>
        <Route path="/userProfile" element={<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}> <Suspense fallback={<div>Loading...</div>}> <UserProfile offset={offset} setOffset={setOffset} /> </Suspense> </ErrorBoundary>}></Route>
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
