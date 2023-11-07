import { Suspense, useEffect, lazy, useState } from "react";
import { Route, Routes } from "react-router-dom"
import 'react-lazy-load-image-component/src/effects/blur.css';
import ErrorFallback from "./ErrorsComponents/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import PrivateRoute from "./privateRouts/PrivateRoute";
import { SessionContext } from "./Session/SessionContext";
import { setSpecialOptionsPopup, setUserSession } from "./States/actions";
import NavBar from "./NavBarComponents/NavBar";
import Footer from "./footer/Footer";
import Home from "./main/Home";
import UserProfile from "./Profile/user/UserProfile";
import Admin from "./Profile/admin/Admin";
import AdminRoute from './privateRouts/AdminRoute'

const DrinkDetails = lazy(() => import("./drinksComponents/DrinkDetails"))

function App() {

  const specialOptionsPopup = useSelector(state => state.navbar.specialOptionsPopupp);
  const userSesion = useSelector(state => state.user.useSesion)

  const dispatch = useDispatch();
  //scroll
  const [userScroll, setUserScroll] = useState(false);
  //Pagiantion offset
  const [offset, setOffset] = useState(0);
  //Drinks Datas
  const [searchingDrink, setSearchingDrink] = useState([])
  const [drinkDatas, setDrinkData] = useState([])

  //control screen changes while scrolling
  useEffect(() => {
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
  useEffect(() => {
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

          <Route path="/drinkDetail/:id"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                <Suspense fallback={<div>Loading...</div>}>
                  <DrinkDetails userSesion={userSesion} searchingDrink={searchingDrink} offset={offset} setOffset={setOffset} />
                </Suspense>
              </ErrorBoundary>
            }>
          </Route>

          <Route path="/userProfile"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                <Suspense fallback={<div>Loading...</div>}>
                  <PrivateRoute element={
                    <UserProfile offset={offset} setOffset={setOffset} drinkDatas={drinkDatas} />
                  } />
                </Suspense>
              </ErrorBoundary>
            }
          ></Route>

          <Route path="/admin"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminRoute element={
                    <Admin drinkDatas={drinkDatas} />
                  } />
                </Suspense>
              </ErrorBoundary>
            }>
          </Route>
        </Routes>

      </SessionContext.Provider>

      <Footer searchingDrink={searchingDrink} drinkDatas={drinkDatas.length} />

    </div >
  );
}

export default App;
