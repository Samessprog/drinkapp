//Imports
import Carousel from "../../carouselsComponents/Carousel";
import { useEffect, useState, useContext } from "react";
import { SessionContext } from "../../Session/SessionContext";



function UserFavouriteDrinks({ userFavouriteDrinks, drinkDatas }) {


  const [ userFavouriteDrinkss ,setUserFavouriteDrinks] = useState('')
  const userSesion = useContext(SessionContext).userSesion;


  useEffect(() => {
    const fetchUserFavouriteDrinks = async () => {
      const userIDs = userSesion.userID
      try {
        const response = await fetch(`http://localhost:3000/api/getUserFavouriteDrinks/${userIDs}`);
        const data = await response.json();
        if (data.success) {
          setUserFavouriteDrinks(data.data);
        } else {
          // Obsługa błędów, jeśli to konieczne
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserFavouriteDrinks();
  }, [userSesion]);

  console.log(userFavouriteDrinkss)

  return (
    <div className="position-relative ">
      <label className="border-bottom fw-bolder ms-3 fs-5 d-flex d-sm-block justify-content-center"> Create your own drink</label>
      <div className="user-favourite-frinks-holder">
        <div className="user-favourite-frinks d-flex justify-content-center">
        
        </div>
      </div>
      <div className="d-flex mt-4 flex-md-row-reverse me-4 flex-column ">
      </div>
    </div >


  );
}

export default UserFavouriteDrinks;