import React, { useState } from "react";
import ItemList from "./ItemList";

const MenuCategory = ({ menu, showItems, setShowIndex }) => {
  // const [show, setShow] = useState(false);

  const [showVeg, setShowVeg] = useState(false);

  const menuFilter = () => {
    if (showVeg) {
      return menu.itemCards
        .map((item) => item)
        .filter((item) => item.card.info.itemAttribute.vegClassifier === "VEG");
    } else {
      return menu.itemCards;
    }
  };

  // console.log(menuFilter());

  const onChangeVeg = () => {
    setShowVeg(!showVeg);
  };

  const handleClick = () => {
    setShowIndex();
  };
  // console.log(menu);

  return (
    <div className="p-2 bg-gray-100 shadow-lg m-2" data-testid="menu-items">
      <div className="mx-auto flex justify-between items-center cursor-pointer">
        <h1 className="text-sm md:text-lg font-bold">
          {menu.title} ({menu.itemCards.length}){" | "}
          <span>
            <input
              type="checkbox"
              checked={showVeg}
              name="veg"
              onChange={onChangeVeg}
              className="mx-2"
            />
            {showVeg ? "🟢" : "👨‍🍳"}
          </span>
        </h1>
        <button onClick={handleClick}>{showItems ? "🔼" : "🔽"} </button>
      </div>
      <h1>{menu.name}</h1>
      {showItems &&
        menuFilter().map((item) => {
          console.log(item);
          return <ItemList key={item.card.info.name} items={item} />;
        })}
    </div>
  );
};

export default MenuCategory;
