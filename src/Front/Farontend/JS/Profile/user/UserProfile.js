//Imports
import { useState, useContext, useEffect, lazy } from "react"
import { useSelector } from "react-redux"

import UserDetails from "./UserDetails"
import UserFavoriteDrinks from "./UserFavouriteDrinks"
import UserOwnDrinks from "./UserOwnDrinks"
import { SessionContext } from "../../Session/SessionContext"
import { API_URL } from '../../Components/Constants'

const UserOwnDrinkPopup = lazy(() => import("./UserDrinks/UserOwnDrinkPopup"))

function UserProfile({ drinkDatas, friendsProfile }) {

  const [drinkAddedFlag, setDrinkAddedFlag] = useState(false)

  const [addUserNewDrink, setAddUserNewDrink] = useState(false)
  const userSession = useContext(SessionContext).userSesion

  const [userIMG, setUserIMG] = useState('')

  const [fetchIMGCompleted, setFetchIMGCompleted] = useState(false)

  //Take img from DB 
  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        let userID = friendsProfile.friendID || userSession.userID
        const response = await fetch(`${API_URL}userIMG?userID=${userID}`, {
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user image')
        }

        const imageData = await response.json()
        const base64ImageData = imageData.userIMG
        const contentType = imageData.contentType

        const imageUrl = `data:${contentType};base64,${base64ImageData}`
        setUserIMG(imageUrl)
        setFetchIMGCompleted(true)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserImage()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="user-details-holder">
      <UserDetails
        userSession={userSession}
        userIMG={userIMG}
        setUserIMG={setUserIMG}
        fetchIMGCompleted={fetchIMGCompleted}
        friendsProfile={friendsProfile}
        drinkAddedFlag={drinkAddedFlag}
      />

      <UserFavoriteDrinks
        drinkDatas={drinkDatas}
        friendsProfile={friendsProfile}
      />

      <UserOwnDrinks
        setAddUserNewDrink={setAddUserNewDrink}
        drinkDatas={drinkDatas}
        addUserNewDrink={addUserNewDrink}
        friendsProfile={friendsProfile}
      />

      {addUserNewDrink && <UserOwnDrinkPopup setDrinkAddedFlag={setDrinkAddedFlag} addUserNewDrink={addUserNewDrink} setAddUserNewDrink={setAddUserNewDrink} />}
    </div>
  )
}

export default UserProfile