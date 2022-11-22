import React from "react";
import NavBar from "./NavBarComponents/NavBar";
import LoginPopup from "./NavBarComponents/LoginPopup";
import SpecialDrinks from "./NavBarComponents/SpecialDrinks";
import MainPage from "./MainPage";
import DrinkDetails from "./drinksComponents/DrinkDetails";
import Footer from "./footer/Footer";
import 'react-lazy-load-image-component/src/effects/blur.css';

function App() {


  //navbar PopUps
  const [Popupsetings, setPopupSetings] = React.useState(false)
  const [loginPopup, setLoginPopup] = React.useState(false)
  const [specialOptionsPopup, setSpecialOptionsPopup] = React.useState(false)

  const [userScroll, setUserScroll] = React.useState(false);

  //Special drinks hooks
  const [ingredientText, setIngredientText] = React.useState("")
  const [ingredient, setingredient] = React.useState([])

  //Drink details (zrobić inaczej)
  const [drinkDetailsPopup, setDrinkDetailsPopup] = React.useState(false)


  const setFixed = () => {
    if (window.scrollY >= 1) {
      setUserScroll(true)

    } else {
      setUserScroll(false)
    }
  }
  window.addEventListener("scroll", setFixed)



  return (
    <div className=".container-fluid">

      {/*do poprawienia wyświtlanie detali  */}


      {!drinkDetailsPopup &&
        <div>

          <NavBar

            Popupsetings={Popupsetings}
            setPopupSetings={setPopupSetings}
            loginPopup={loginPopup}
            setLoginPopup={setLoginPopup}
            setSpecialOptionsPopup={setSpecialOptionsPopup}
            specialOptionsPopup={specialOptionsPopup}

            userScroll={userScroll}

          />


          {specialOptionsPopup &&

            <SpecialDrinks

              ingredientText={ingredientText}
              setIngredientText={setIngredientText}
              ingredient={ingredient}
              setingredient={setingredient}
              setSpecialOptionsPopup={setSpecialOptionsPopup}

            />
          }

          <MainPage  
            setDrinkDetailsPopup={setDrinkDetailsPopup}
            userScroll={userScroll}
          />
          <Footer />

        </div>


      }


      {drinkDetailsPopup &&
        <DrinkDetails

          drinkDetailsPopup={drinkDetailsPopup}
          setDrinkDetailsPopup={setDrinkDetailsPopup}
          userScroll={userScroll}

        />

      }

    </div>
  );
}

export default App;
