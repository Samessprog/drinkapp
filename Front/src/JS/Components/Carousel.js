import React, { useState, useEffect } from "react";
const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showItems, setShowItems] = useState([]);

  useEffect(() => {
    
    if (children) {
      const itemsArray = React.Children.toArray(children);
      const itemsLength = itemsArray.length;
      const itemsToShow = [];

      // Jeżeli mniej niż 5 elementy, wyświetl wszystkie i zablokuj przewijanie
      if (itemsLength <= 4) {
        setShowItems(itemsArray);
        return;
      }

      const startIndex = currentIndex % itemsLength;

      // Pobierz pierwsze 4 elementy
      for (let i = startIndex; i < startIndex + 5; i++) {
        itemsToShow.push(itemsArray[i % itemsLength]);
      }

      setShowItems(itemsToShow);
    }
  }, [children, currentIndex]);

  const handlePrev = () => {
    const itemsCount = React.Children.count(children);
    // const lastIndex = itemsCount - 1;
    const newIndex = (currentIndex - 5 + itemsCount) % itemsCount;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 5);
  };

  return (
    <div className="carousel col-12 ">
      <div className="carousel-items d-flex justify-content-center mb-2 col-12 cc ">
        {showItems}
      </div>

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
        className="position-absolute top-50 end-0 me-4 d-none d-md-flex scroll-arrow-fav-own-box"
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
  );
};
export default Carousel;
