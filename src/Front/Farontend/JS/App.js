import { Suspense, useEffect, lazy, useState } from "react"
import { Route, Routes } from "react-router-dom"
import 'react-lazy-load-image-component/src/effects/blur.css'
import ErrorFallback from "./ErrorsComponents/ErrorBoundary"
import { ErrorBoundary } from "react-error-boundary"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'

import localhost from "../../../config/config"
import PrivateRoute from "./privateRouts/PrivateRoute"
import { SessionContext } from "./Session/SessionContext"
import { setSpecialOptionsPopup, setUserSession } from "./States/actions"
import NavBar from "./NavBarComponents/NavBar"
import Footer from "./footer/Footer"
import Home from "./main/Home"
import UserProfile from "./Profile/user/UserProfile"
import Admin from "./Profile/admin/Admin"
import AdminRoute from './privateRouts/AdminRoute'
const ChatAndFriendsIcons = lazy(() => import("./Chat&FreindsComponents.js/ChatAndFriendsIcons"))

const DrinkDetails = lazy(() => import("./drinksComponents/DrinkDetails"))
const ChatRoomPopup = lazy(() => import("./Chat&FreindsComponents.js/ChatRoomPopup"))
const FriendsPopup = lazy(() => import("./Components/FriendsPopup"))
const Chat = lazy(() => import("./Components/chat"))

const socket = io(`http://${localhost}:4001`);

function App() {

  const specialOptionsPopup = useSelector(state => state.navbar.specialOptionsPopupp)
  const userSesion = useSelector(state => state.user.useSesion)

  const dispatch = useDispatch()
  //scroll
  const [userScroll, setUserScroll] = useState(false)
  //Pagiantion offset
  const [offset, setOffset] = useState(0)
  //Drinks Datas
  const [searchingDrink, setSearchingDrink] = useState([])
  const [drinkDatas, setDrinkData] = useState([])

  //const for chat
  const [chatID, setChatID] = useState(1)
  const [roomFlag, setRoomFlag] = useState(false)
  const [minimize, setMinimize] = useState(false)
  const [showChat, setShowChat] = useState(false)

  //friends
  const [friendsModalFlag, setFriendsModalFlag] = useState(false)
  const [friendsProfile, setFriendsProfile] = useState({ friendID: null, freindNick: '' })

  //control screen changes while scrolling
  useEffect(() => {
    const setFixed = () => {
      setUserScroll(window.scrollY >= 1)
    }

    window.addEventListener("scroll", setFixed)
    return () => window.removeEventListener("scroll", setFixed)
  }, [])

  //Faetch session data from DB
  useEffect(() => {
    fetch(`http://${localhost}:3000/api/session`, {
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.user) {
          dispatch(setUserSession(data.user));
        } else {
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  //Faetch drinks data from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://${localhost}:3001/drinks`)
        setDrinkData(data)
        setSearchingDrink(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])


  return (

    <div className="col-12 kop">

      <NavBar
        setSpecialOptionsPopup={setSpecialOptionsPopup}
        drinkDatas={drinkDatas}
        searchingDrink={searchingDrink}
        setSearchingDrink={setSearchingDrink}
        userScroll={userScroll}
        setFriendsProfile={setFriendsProfile}
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
              setFriendsProfile={setFriendsProfile}

            />}>
          </Route>
          <Route path="/drinkDetail/:id"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                <Suspense fallback={<div>Loading...</div>}>
                  <DrinkDetails
                    userSesion={userSesion}
                    searchingDrink={searchingDrink}
                    offset={offset}
                    setOffset={setOffset}
                  />
                </Suspense>
              </ErrorBoundary>
            }>
          </Route>
          <Route path="/userProfile"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                <Suspense fallback={<div>Loading...</div>}>
                  <PrivateRoute element={
                    <UserProfile
                      offset={offset}
                      setOffset={setOffset}
                      drinkDatas={drinkDatas}
                      friendsProfile={friendsProfile}
                    />
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
                    <Admin
                      drinkDatas={drinkDatas}
                    />
                  } />
                </Suspense>
              </ErrorBoundary>
            }>
          </Route>
        </Routes>
      </SessionContext.Provider>

      {/*Chat and Friends Popups */}

      <ChatAndFriendsIcons
        minimize={minimize}
        userSesion={userSesion}
        setRoomFlag={setRoomFlag}
        setFriendsModalFlag={setFriendsModalFlag}
      />

      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
        <Suspense fallback={<div>Loading...</div>}>
          <ChatRoomPopup
            userSesion={userSesion}
            socket={socket}
            chatID={chatID}
            setShowChat={setShowChat}
            roomFlag={roomFlag}
            setRoomFlag={setRoomFlag}
            setChatID={setChatID}
          />
        </Suspense>
      </ErrorBoundary>

      {(showChat && userSesion !== null || undefined) &&
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Chat
              setShowChat={setShowChat}
              socket={socket}
              chatID={chatID}
              minimize={minimize}
              setMinimize={setMinimize}
              userSesion={userSesion}
            />
          </Suspense>
        </ErrorBoundary>
      }

      {friendsModalFlag &&
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
          <Suspense fallback={<div>Loading...</div>}>
            <FriendsPopup
              setFriendsModalFlag={setFriendsModalFlag}
              setFriendsProfile={setFriendsProfile}
              userSesion={userSesion}
            />
          </Suspense>
        </ErrorBoundary>
      }

      <Footer searchingDrink={searchingDrink} drinkDatas={drinkDatas.length} />

    </div >
  )
}

export default App
