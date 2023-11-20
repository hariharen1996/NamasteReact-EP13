import React from "react";
import ItemList from "./ItemList";
import { useDispatch, useSelector } from "react-redux";
import { clearItem } from "../utils/redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  let sum = 0;

  const total = (sum) => {
    const addPrice = cartItems.reduce((acc, item) => {
      const { quantity } = item;
      const { price } = item.card.info;
      sum += quantity * (price / 100);
      return sum;
    }, 0);
    return addPrice;
  };

  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold my-2">Order Summary</h1>
        <button
          className="bg-gray-300 hover:bg-black hover:text-white hover:transition-all border border-black-100 text-black cursor-pointer text-sm  px-5 py-1 rounded-lg"
          onClick={() => dispatch(clearItem())}
        >
          Clear Cart
        </button>
      </div>
      {cartItems.length === 0 ? (
        <h1 className="text-center text-lg font-bold my-5">
          Cart is empty. Please add items in your cart
        </h1>
      ) : (
        <div className="w-11/12 lg:w-6/12 mx-auto bg-gray-50 my-3 shadow-lg">
          {cartItems.map((item) => (
            <ItemList
              key={item.card.info.id}
              items={item}
              qty={item.quantity}
            />
          ))}
          <h1 className="text-end text-md font-bold p-2">
            Order Total: {total(sum)}
          </h1>
        </div>
      )}
    </>
  );
};

export default Cart;
