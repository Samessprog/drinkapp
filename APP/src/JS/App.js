import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"
import 'react-lazy-load-image-component/src/effects/blur.css';
import ErrorFallback from "./Components/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


import { SessionContext } from "./Session/SessionContext";
import { setSpecialOptionsPopup, setUserSession } from "./States/actions";
import NavBar from "./NavBarComponents/NavBar";
import Footer from "./footer/Footer";
import Home from "./Home";
import UserProfile from "./Profile/UserProfile";

const DrinkDetails = React.lazy(() => import("./drinksComponents/DrinkDetails"))

function App() {

  const specialOptionsPopup = useSelector(state => state.navbar.specialOptionsPopupp);

  const userSesion = useSelector(state => state.user.useSesion)

  const dispatch = useDispatch();

  //scroll
  const [userScroll, setUserScroll] = React.useState(false);
  //Pagiantion offset
  const [offset, setOffset] = React.useState(0);
  //Drinks Datas
  const [searchingDrink, setSearchingDrink] = React.useState([])
  const [drinkDatas, setDrinkData] = React.useState([])


  React.useEffect(() => {
    const setFixed = () => {
      setUserScroll(window.scrollY >= 1);
    };

    const fetchData = async () => {
      try {
        const sessionResponse = await fetch('http://localhost:3000/api/session', {
          credentials: 'include'
        });
        const sessionData = await sessionResponse.json();
        if (sessionData.user) {
          dispatch(setUserSession(sessionData.user));
        }

        const drinksResponse = await axios.get("http://localhost:3001/drinks");
        const drinksData = drinksResponse.data;
        setDrinkData(drinksData);
        setSearchingDrink(drinksData);
      } catch (err) {
        console.log(err);
      }
    };

    window.addEventListener("scroll", setFixed);
    fetchData();

    return () => {
      window.removeEventListener("scroll", setFixed);
    };
  }, []);


  return (
    <div className="col-12 kop">

      <NavBar
        setSpecialOptionsPopup={setSpecialOptionsPopup}
        drinkDatas={drinkDatas}
        searchingDrink={searchingDrink}
        setSearchingDrink={setSearchingDrink}
        userScroll={userScroll}

      />

      <SessionContext.Provider value={{ userSesion, setUserSession }}>
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

          <Route path="/drinkDetail/:id" element={<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}> <Suspense fallback={<div>Loading...</div>}> <DrinkDetails userSesion={userSesion} searchingDrink={searchingDrink} offset={offset} setOffset={setOffset} /> </Suspense> </ErrorBoundary>}></Route>
          <Route path="/userProfile" element={<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}> <Suspense fallback={<div>Loading...</div>}> <UserProfile offset={offset} setOffset={setOffset} /> </Suspense> </ErrorBoundary>}></Route>
        </Routes>
      </SessionContext.Provider>
      <Footer />

    </div >
  );
}

export default App;
