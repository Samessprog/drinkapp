import { useState, useEffect } from "react";

import FavouriteDrinks from "../Profile/user/UserDrinks/UserDrink";

const Carousel = ({ favouriteUsersDrink }) => {

  //Index for carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showItems, setShowItems] = useState([]);


  useEffect(() => {
    if (favouriteUsersDrink) {
      const favouriteDrinksLength = favouriteUsersDrink.length;
      const favouriteItemsToShow = [];

      if (favouriteDrinksLength <= 4) {
        setShowItems(favouriteUsersDrink);
        return;
      }

      const startIndex = currentIndex % favouriteDrinksLength;

      // Get the first 4 items
      for (let i = startIndex; i < startIndex + 4; i++) {
        const itemIndex = i >= favouriteDrinksLength ? i - favouriteDrinksLength : i;
        favouriteItemsToShow.push(favouriteUsersDrink[itemIndex]);
      }
      setShowItems(favouriteItemsToShow);
    }
  }, [currentIndex]);

  //changes to the carousel and item views
  const handlePrev = () => {
    const itemsCount = favouriteUsersDrink.length;
    const newIndex = (currentIndex - 3 + itemsCount) % itemsCount;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const itemsCount = favouriteUsersDrink.length;
    const newIndex = (currentIndex + 3) % itemsCount;
    setCurrentIndex(newIndex);
  };


  return (
    <div className="carousel col-12 ms-0 me-0 ps-0 pe-0">
      <div className="carousel-items d-flex justify-content-center mb-2 col-12 cc ">
        {showItems.length === 0 ? (
          <div className="no-fav-drinks fs-4">No favorite drinks</div>
        ) : (
          showItems.map((elm) => (
            <FavouriteDrinks
              key={elm.ID_DRINK}
              elm={elm}
              favouriteUsersDrink={favouriteUsersDrink}
            />
          ))
        )}
      </div>

      {favouriteUsersDrink.length > 4 &&
        <div>
          <div
            className="position-absolute start-0 top-50 d-none d-md-flex scroll-arrow-fav-own-box"
            onClick={handlePrev}
          >
            <svg
              id="left-arrow"
              xmlns="http://www.w3.org/2000/svg"
              className="scroll-arrow-fav-own ps-2"
              height="48"
              width="48"
            >
              <path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z" />
            </svg>
          </div>

          <div
            className="position-absolute top-50 end-0  d-none d-md-flex scroll-arrow-fav-own-box"
            onClick={handleNext}
          >
            <svg
              id="right-arrow"
              xmlns="http://www.w3.org/2000/svg"
              className="scroll-arrow-fav-own"
              height="48"
              width="48"
            >
              <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
            </svg>
          </div>

        </div>

      }

    </div>
  );
};
export default Carousel;
