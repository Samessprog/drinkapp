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




  //ADD USE EFFECT
  const setFixed = () => {
    if (window.scrollY >= 1) {
      setUserScroll(true)

    } else {
      setUserScroll(false)
    }
  }

  window.addEventListener("scroll", setFixed)

  const [drinkDatas, setDrinkData] = React.useState([])


  React.useEffect(() => {

    const fetchData = async () => {
      try {
        const datas = await fetch("http://localhost:3000/api.php")
        const drinkData = await datas.json();
        setDrinkData(drinkData)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData();
  }, [])





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
            drinkDatas={drinkDatas}
            drinkDetailsPopup={drinkDetailsPopup}
          />
          <Footer />

        </div>


      }


      {drinkDetailsPopup &&
        <DrinkDetails
          drinkDatas={drinkDatas}
          drinkDetailsPopup={drinkDetailsPopup}
          setDrinkDetailsPopup={setDrinkDetailsPopup}
          userScroll={userScroll}

        />

      }

    </div>
  );
}

export default App;
