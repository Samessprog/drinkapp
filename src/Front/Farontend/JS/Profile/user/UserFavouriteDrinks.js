//Imports
import Carousel from "../../carouselsComponents/Carousel"
import { useEffect, useState, useContext } from "react"
import { SessionContext } from "../../Session/SessionContext"
import localhost from "../../../../../config/config"

function UserFavoriteDrinks({ friendsProfile }) {

  const [isHidden, setIsHidden] = useState(false)
  const [favoriteUsersDrink, setUserFavoriteDrinks] = useState('')
  const userSession = useContext(SessionContext).userSesion

  useEffect(() => {
    const fetchUserFavoriteDrinks = async () => {
      const userIDs = friendsProfile.freindNick || userSession.nick
      try {
        const response = await fetch(`http://${localhost}:3000/api/getUserFavouriteDrinks/${userIDs}`)
        const data = await response.json()
        if (data.success) {
          setUserFavoriteDrinks(data.data)
        } else {
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserFavoriteDrinks()
  }, [userSession, isHidden])

  return (
    <div className="position-relative ">
      <label className="border-bottom fw-bolder ms-3 fs-5 d-flex d-sm-block justify-content-center"> Create your own drink</label>
      <div className="user-favourite-frinks-holder">
        <div className="user-favourite-frinks d-flex justify-content-center ">
          <Carousel
            favoriteUsersDrink={favoriteUsersDrink}
            setIsHidden={setIsHidden}
            isHidden={isHidden}
            friendsProfile={friendsProfile}
          >
          </Carousel>
        </div>
      </div>
      <div className="d-flex mt-4 flex-md-row-reverse me-4 flex-column ">
      </div>
    </div >
  )
}

export default UserFavoriteDrinks