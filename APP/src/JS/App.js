import React, { Suspense, useEffect } from "react";
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
import Admin from "./Profile/admin/Admin";

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

  //control screen changes while scrolling
  React.useEffect(() => {
    const setFixed = () => {
      setUserScroll(window.scrollY >= 1);
    };

    window.addEventListener("scroll", setFixed);
    return () => window.removeEventListener("scroll", setFixed);
  }, []);

  //Faetch session data from DB
  useEffect(() => {
    fetch('http://localhost:3000/api/session', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          dispatch(setUserSession(data.user))
        }
      });
  }, []);

  //Faetch drinks data from DB
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/drinks");
        setDrinkData(data);
        setSearchingDrink(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
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
          <Route path="/userProfile" element={<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}> <Suspense fallback={<div>Loading...</div>}> <UserProfile offset={offset} setOffset={setOffset} drinkDatas={drinkDatas} /> </Suspense> </ErrorBoundary>}></Route>
          <Route path="/admin" element={<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}> <Suspense fallback={<div>Loading...</div>}> <Admin drinkDatas={drinkDatas} /> </Suspense> </ErrorBoundary>}></Route>
        </Routes>
      </SessionContext.Provider>
      <Footer searchingDrink={searchingDrink} />

    </div >
  );
}

export default App;
