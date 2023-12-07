//Imports
import { useState, useContext, useEffect, lazy } from "react"
import { useSelector } from "react-redux"

import UserDetails from "./UserDetails"
import UserFavouriteDrinks from "./UserFavouriteDrinks"
import UserOwnDrinks from "./UserOwnDrinks"
import { SessionContext } from "../../Session/SessionContext"
import { API_URL } from '../../Components/Constants'

const UserOwnDrinkPopup = lazy(() => import("./UserDrinks/UserOwnDrinkPopup"))

function UserProfile({ drinkDatas, freindsProfile }) {

  const [addUserNewDrink, setAddUserNewDrink] = useState(false)
  const userSesion = useContext(SessionContext).userSesion

  const [userIMG, setUserIMG] = useState('')

  const userFavouriteDrinks = useSelector(state => state.user.userFavouriteDrinks)

  const [fetchIMGCompleted, setFetchIMGCompleted] = useState(false)

  //Take img from DB 
  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        let userID = freindsProfile.friendID || userSesion.userID
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
        userSesion={userSesion}
        userIMG={userIMG}
        setUserIMG={setUserIMG}
        fetchIMGCompleted={fetchIMGCompleted}
        freindsProfile={freindsProfile}
      />

      <UserFavouriteDrinks
        userFavouriteDrinks={userFavouriteDrinks}
        drinkDatas={drinkDatas}
        freindsProfile={freindsProfile}
      />

      <UserOwnDrinks
        setAddUserNewDrink={setAddUserNewDrink}
        drinkDatas={drinkDatas}
        addUserNewDrink={addUserNewDrink}
        freindsProfile={freindsProfile}
      />

      {addUserNewDrink && <UserOwnDrinkPopup addUserNewDrink={addUserNewDrink} setAddUserNewDrink={setAddUserNewDrink} />}
    </div>
  )
}


export default UserProfile