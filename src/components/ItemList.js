import React from "react";
import { CDN_URL, DEFAULT_IMAGE } from "../utils/constants";
import { useDispatch } from "react-redux";
import {
  addItem,
  decreaseQuantity,
  removeItem,
} from "../utils/redux/cartSlice";
import { useLocation } from "react-router-dom";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

const ItemList = ({ items }) => {
  // console.log(items.card.info.name);
  const { name, price, description, imageId, defaultPrice, itemAttribute } =
    items.card.info;
  const { quantity } = items;

  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location);

  const handleItem = (item) => {
    dispatch(addItem(item));
  };

  const addQuantity = (item) => {
    dispatch(addItem(item));
  };

  const reduceQuantity = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const removeItems = (item) => {
    dispatch(removeItem(item.card.info.name));
  };

  return (
    <div className="md:w-full border-gray-300 border-b-2 last:border-b-0 text-left flex justify-between items-center p-3 m-2">
      <div className="w-6/12 sm:w-9/12">
        {itemAttribute.vegClassifier === "VEG" ? "🟢" : "🔴"}
        <h1 className="text-sm md:text-lg font-bold">
          {name}{" "}
          {location.pathname === "/cart" && (
            <span className="font-bold text-md">[{quantity}]</span>
          )}
        </h1>
        <p className="text-xs leading-5">
          ₹ {price ? price / 100 : defaultPrice / 100}
        </p>
        <p className="text-xs leading-5">
          {description
            ? description
            : "Serves 1 | Images used are for representation purposes only, and do not indicate size, portion, quantity or color of the actual dish."}
        </p>
      </div>
      <div className="w-6/12 sm:w-4/12 p-2 ">
        <img
          src={imageId ? CDN_URL + imageId : DEFAULT_IMAGE}
          alt={name}
          className="w-full"
        />
        {location.state === true && (
          <>
            <div className="text-center">
              <button
                className="bg-gray-300 hover:bg-black hover:text-white hover:transition-all border border-black-100 text-black cursor-pointer text-sm  px-5 py-1 rounded-lg"
                onClick={() => handleItem(items)}
              >
                Add
              </button>
            </div>
          </>
        )}
        {location.pathname === "/cart" && (
          <>
            <div className="text-center">
              <button
                className="bg-gray-300 hover:bg-black hover:text-white hover:transition-all border border-black-100 text-black cursor-pointer text-sm  px-5 py-1 rounded-lg"
                onClick={() => removeItems(items)}
              >
                Remove
              </button>
            </div>
            <div className="flex justify-center items-center gap-3">
              <button onClick={() => addQuantity(items)}>
                <BsPlusSquare />
              </button>
              <p>{quantity}</p>
              <button onClick={() => reduceQuantity(items)}>
                <BsDashSquare />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemList;
