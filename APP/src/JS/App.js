import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom"
import 'react-lazy-load-image-component/src/effects/blur.css';
import ErrorFallback from "./Components/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";
import axios from 'axios';

import { setSpecialOptionsPopup } from "./States/actions";
import NavBar from "./NavBarComponents/NavBar";
import Footer from "./footer/Footer";
import Home from "./Home";
import UserProfile from "./Profile/UserProfile";

const DrinkDetails = React.lazy(() => import("./drinksComponents/DrinkDetails"))

function App() {

  const specialOptionsPopup = useSelector(state => state.navbar.specialOptionsPopupp);

  //scroll
  const [userScroll, setUserScroll] = React.useState(false);
  //Pagiantion offset
  const [offset, setOffset] = React.useState(0);
  //Drinks Datas
  const [searchingDrink, setSearchingDrink] = React.useState([])
  const [drinkDatas, setDrinkData] = React.useState([])
  //Drink input text
  const [inputDrinkText, setInputDrinkText] = React.useState("");


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
        inputDrinkText={inputDrinkText}
        setInputDrinkText={setInputDrinkText}

      />


      <Routes>
        <Route path="/" element={
          <Home
            setSpecialOptionsPopup={setSpecialOptionsPopup}
            drinkDatas={drinkDatas}
            searchingDrink={searchingDrink}
            specialOptionsPopup={specialOptionsPopup}
            userScroll={userScroll}
            setSearchingDrink={setSearchingDrink}
            offset={offset}
            setOffset={setOffset}
            
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
