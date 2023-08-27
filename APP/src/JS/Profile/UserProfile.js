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


  //Take img from DB 
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

        setUserIMG(blob.size === 0 ? 'https://ponadwszystko.com/wp-content/uploads/2016/08/anonim.jpg' : URL.createObjectURL(blob))
        
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

      <UserDetails userSesion={userSesion} userIMG={userIMG} setUserIMG={setUserIMG} />
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