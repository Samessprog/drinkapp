import { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";

import UserDetails from "./UserDetails";
import UserOwnDrinks from "./UserOwnDrinks";
import UserFavouriteDrinks from "./UserFavouriteDrinks";
import UserOwnDrinkPopup from "./UserDrinks/UserOwnDrinkPopup";
import { SessionContext } from "../Session/SessionContext";

function UserProfile({ drinkDatas }) {
  

  const [addUserNewDrink, setAddUserNewDrink] = useState(false)
  const userSesion = useContext(SessionContext).userSesion;
  
  const [userIMG, setUserIMG] = useState('')

  const userFavouriteDrinks = useSelector(state => state.user.userFavouriteDrinks);

  const [fetchIMGCompleted, setFetchIMGCompleted] = useState(false)
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
        setFetchIMGCompleted(true)
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserImage();
  }, []);

  return (
    <div className="user-details-holder">
      <UserDetails userSesion={userSesion} userIMG={userIMG} setUserIMG={setUserIMG} fetchIMGCompleted={fetchIMGCompleted} />
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