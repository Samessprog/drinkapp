import { useState, useContext, useEffect } from "react";
import UserDetails from "./UserDetails";
import UserOwnDrinks from "./UserOwnDrinks";
import UserFavouriteDrinks from "./UserFavouriteDrinks";
import UserOwnDrinkPopup from "./UserDrinks/UserOwnDrinkPopup";
import { SessionContext } from "../Session/SessionContext";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


function UserProfile({ drinkDatas }) {
  const [addUserNewDrink, setAddUserNewDrink] = useState(false)
  const userSesion = useContext(SessionContext).userSesion;

  const [userIMG, setUserIMG] = useState('')

  const userFavouriteDrinks = useSelector(state => state.user.userFavouriteDrinks);


  useEffect(() => {

    const fetchUserImage = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/userIMG', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user image');
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setUserIMG(imageUrl);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserImage();
  }, []);



  if (userSesion === null) {
    return <Navigate to="/" />;
  }

  return (
    <div className="user-details-holder">

      <UserDetails userSesion={userSesion} userIMG={userIMG} />
      <UserFavouriteDrinks
        userFavouriteDrinks={userFavouriteDrinks}
        drinkDatas={drinkDatas}
      />
      
      <UserOwnDrinks
        setAddUserNewDrink={setAddUserNewDrink}
        drinkDatas={drinkDatas}
        addUserNewDrink={addUserNewDrink}
      />

      {addUserNewDrink && <UserOwnDrinkPopup addUserNewDrink={addUserNewDrink} setAddUserNewDrink={setAddUserNewDrink} />}
    </div>
  )
}


export default UserProfile;