import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

export const App = () => {
  const [cards, setCards] = useState([
    ["item 1", "item 2", "item 3", "item 4"],
    ["item 5", "item 6"],
    ["item 7", "item 8", "item 9"],
    ["item 10", "item 11", "item 12"],
    ["item 13", "item 14", "item 15"],
  ]);
  const [currentDragItem, setCurrentDragItem] = useState(null);
  const [currentTargetItem, setCurrentTargetItem] = useState(null);
  const prevTargetRef = useRef(null);

  const handleDragStart = (event) => {
    setCurrentDragItem({
      index: event.target.getAttribute("data-key"),
      basket: event.target.parentNode.getAttribute("data-key"),
      content: event.target.textContent,
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    const newTargetItem = {
      index: event.target.getAttribute("data-key"),
      basket: event.target.parentNode.getAttribute("data-key"),
      content: event.target.textContent,
    };
    if (
      JSON.stringify(prevTargetRef.current) !== JSON.stringify(newTargetItem)
    ) {
      setCurrentTargetItem(newTargetItem);
      console.log("111");
    }

    // Обновляем реф с текущим значением
    prevTargetRef.current = newTargetItem;
  };

  const handleDragLeave = () => {
    setCurrentTargetItem(null);
  };

  const handleDragEnd = () => {
    if (currentTargetItem && currentDragItem) {
      const extractedCards = [...cards];
      extractedCards[currentDragItem.basket].splice(currentDragItem.index, 1);
      extractedCards[currentTargetItem.basket].splice(
        currentTargetItem.index,
        0,
        currentDragItem.content
      );

      setCards(extractedCards);
      setCurrentDragItem(null);
      setCurrentTargetItem(null);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        {cards.map((ul, ulIndex) => {
          return (
            <ul key={`cardsUlId_${ulIndex}`} data-key={ulIndex}>
              {ul.map((li, liIndex) => {
                const isHovered =
                  ulIndex == currentTargetItem?.basket &&
                  liIndex == currentTargetItem?.index;
                const isDragged =
                  ulIndex == currentDragItem?.basket &&
                  liIndex == currentDragItem?.index;

                return (
                  <li
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={classNames({
                      hoverable: isHovered,
                      dragged: isDragged,
                    })}
                    draggable="true"
                    key={`cardsLiId_${ulIndex}.${liIndex}`}
                    data-key={liIndex}
                  >
                    {li}
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default App;
