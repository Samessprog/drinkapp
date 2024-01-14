import { useState, useEffect } from "react"

import FavoriteDrinks from "../Profile/user/UserDrinks/UserDrink"

const Carousel = ({ favoriteUsersDrink, isHidden, setIsHidden, friendsProfile }) => {

  //Index for carousel
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showItems, setShowItems] = useState([])

  useEffect(() => {
    if (favoriteUsersDrink) {

      const favoriteDrinksLength = favoriteUsersDrink.length
      const favoriteItemsToShow = []

      if (favoriteDrinksLength <= 4) {
        setShowItems(favoriteUsersDrink)
        return
      }

      const startIndex = currentIndex % favoriteDrinksLength
      // Get the first 4 items
      for (let i = startIndex; i < startIndex + 4; i++) {
        const itemIndex = i >= favoriteDrinksLength ? i - favoriteDrinksLength : i
        favoriteItemsToShow.push(favoriteUsersDrink[itemIndex])
      }

      setShowItems(favoriteItemsToShow)
    }
  }, [currentIndex, favoriteUsersDrink, isHidden])


  //changes to the carousel and item views
  const handlePrev = () => {
    const itemsCount = favoriteUsersDrink.length
    const newIndex = (currentIndex - 3 + itemsCount) % itemsCount
    setCurrentIndex(newIndex)
  }

  const handleNext = () => {
    const itemsCount = favoriteUsersDrink.length
    const newIndex = (currentIndex + 3) % itemsCount
    setCurrentIndex(newIndex)
  }

  return (
    <div className="carousel carousel-holder col-12 ">
      <div className=" d-flex justify-content-center mb-2 col-12 cc ">
        {showItems.length === 0 ? (
          <div className="no-fav-drinks fs-2">No favorite drinks</div>
        ) : (
          showItems.map((elm, index) => (
            <FavoriteDrinks
              key={index}
              elm={elm}
              setIsHidden={setIsHidden}
              isHidden={isHidden}
              friendsProfile={friendsProfile}
            />
          ))
        )}
      </div>
      {favoriteUsersDrink.length > 4 &&
        <div>
          <div
            className="position-absolute start-0  d-flex scroll-arrow-fav-own-box border-radius-15-0-0-15"
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
            className="position-absolute end-0  d-flex scroll-arrow-fav-own-box"
            onClick={handleNext}
          >
            <svg
              className="scroll-arrow-fav-own"
              xmlns="http://www.w3.org/2000/svg"
              height="48" viewBox="0 -960 960 960" width="48">
              <path d="m304-82-56-57 343-343-343-343 56-57 400 400L304-82Z" /></svg>
          </div>
        </div>
      }
    </div>
  )
}
export default Carousel
