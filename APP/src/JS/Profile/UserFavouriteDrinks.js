//Imports
import Carousel from "../Components/Carousel";

function UserFavouriteDrinks({ userFavouriteDrinks, drinkDatas }) {

  const favouriteUsersDrink = userFavouriteDrinks.map((favId) => {
    const favouriteDrink = drinkDatas.find((drink) => {
      console.log(drink)
      if (favId === drink.ID_DRINK) {
        return drink;
      }

    });
    return favouriteDrink;
  })

  return (
    <div className="favourite-holder-user-drink col-12">
      <label className="border-bottom fw-bolder ms-3 fs-5 d-flex d-sm-block justify-content-center">Your favourite</label>
      <div className="user-favourite-frinks-holder d-flex justify-content-center col-12 col-sm-11">

        <Carousel favouriteUsersDrink={favouriteUsersDrink}> </Carousel>

      </div>

    </div>
  );
}

export default UserFavouriteDrinks;