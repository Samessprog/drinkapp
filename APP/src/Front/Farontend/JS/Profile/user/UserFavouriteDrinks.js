//Imports
import Carousel from "../../carouselsComponents/Carousel";

function UserFavouriteDrinks({ userFavouriteDrinks, drinkDatas, setClickedDrinkDetail, clickedDrinkDetail }) {

  const favouriteUsersDrink = userFavouriteDrinks.map((favId) => {
    const favouriteDrink = drinkDatas.find((drink) => {
      if (favId === drink.ID_DRINK) {
        return drink;
      }
    });
    return favouriteDrink;
  })

  return (
    <div className="position-relative ">
      <label className="border-bottom fw-bolder ms-3 fs-5 d-flex d-sm-block justify-content-center"> Create your own drink</label>
      <div className="user-favourite-frinks-holder">
        <div className="user-favourite-frinks d-flex justify-content-center">
          <Carousel
            favouriteUsersDrink={favouriteUsersDrink}
            setClickedDrinkDetail={setClickedDrinkDetail}
            clickedDrinkDetail={clickedDrinkDetail}
          >
          </Carousel>
        </div>
      </div>
      <div className="d-flex mt-4 flex-md-row-reverse me-4 flex-column ">
      </div>
    </div >


  );
}

export default UserFavouriteDrinks;