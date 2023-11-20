import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = () => {
  let getCart = JSON.parse(localStorage.getItem("food"));
  if (getCart) {
    return getCart;
  } else {
    return [];
  }
};

console.log(getLocalStorage());

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getLocalStorage(),
  },
  reducers: {
    addItem: (state, action) => {
      const isFoodExist = state.items.findIndex(
        (item) =>
          parseInt(item.card.info.id) === parseInt(action.payload.card.info.id)
      );

      if (isFoodExist >= 0) {
        state.items[isFoodExist].quantity += 1;
      } else {
        const newItems = {
          ...action.payload,
          quantity: 1,
        };
        state.items.push(newItems);
      }
      localStorage.setItem("food", JSON.stringify(state.items));

      // console.log(isFoodExist, action.payload.card.info.id);
    },
    removeItem: (state, action) => {
      state.items.filter((data, index) => {
        return data.card.info.name === action.payload
          ? state.items.splice(index, 1)
          : data;
      });
      localStorage.setItem("food", JSON.stringify(state.items));
    },
    clearItem: (state) => {
      state.items.length = 0;
      localStorage.setItem("food", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action) => {
      const isFoodExist = state.items.findIndex(
        (item) =>
          parseInt(item.card.info.id) === parseInt(action.payload.card.info.id)
      );
      if (state.items[isFoodExist].quantity > 1) {
        state.items[isFoodExist].quantity -= 1;
      } else if (state.items[isFoodExist].quantity === 1) {
        state.items[isFoodExist].length = 0;
      }
      localStorage.setItem("food", JSON.stringify(state.items));
    },
  },
});

export const { addItem, removeItem, clearItem, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
