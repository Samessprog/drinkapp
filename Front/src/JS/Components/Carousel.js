import React, { useState, useEffect } from "react";
const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showItems, setShowItems] = useState([]);

  useEffect(() => {
    if (children) {
      const itemsArray = React.Children.toArray(children);
      const itemsLength = itemsArray.length;
      const itemsToShow = [];

      // Jeżeli mniej niż 4 elementy, wyświetl wszystkie i zablokuj przewijanie
      if (itemsLength <= 3) {
        setShowItems(itemsArray);
        return;
      }

      const startIndex = currentIndex % itemsLength;

      // Pobierz pierwsze 4 elementy
      for (let i = startIndex; i < startIndex + 4; i++) {
        itemsToShow.push(itemsArray[i % itemsLength]);
      }

      // Jeśli zostały jeszcze elementy, to pobieramy kolejne 4
      // let i = (startIndex + 4) % itemsLength;

      // while (itemsToShow.length < 4 && i !== startIndex) {
      //   itemsToShow.push(itemsArray[i]);
      //   console.log(itemsToShow)
      //   i = (i + 1) % itemsLength;
      // }

      setShowItems(itemsToShow);
    }
  }, [children, currentIndex]);

  const handlePrev = () => {
    const itemsCount = React.Children.count(children);
    const lastIndex = itemsCount - 1;
    const newIndex = (currentIndex - 4 + itemsCount) % itemsCount;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 4);
  };

  return (
    <div className="carousel">
      <div className="carousel-items d-flex justify-content-center">
        {showItems}
      </div>

      <div
        className="position-absolute start-0 top-50 ms-2"
        onClick={handlePrev}
      >
        <svg
          id="left-arrow"
          xmlns="http://www.w3.org/2000/svg"
          className="scroll-arrow-fav-own"
          height="48"
          width="48"
        >
          <path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z" />
        </svg>
      </div>
      <div
        className="position-absolute top-50 end-0 me-1"
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
