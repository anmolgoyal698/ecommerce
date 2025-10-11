import { createSlice } from "@reduxjs/toolkit";
import { updateCartBilling } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemToAdd = action.payload;

      // Check if item to add already exists in the cart
      const isItemAlreadyExists = state.cartItems.some(
        (item: any) => item._id === itemToAdd._id
      );

      if (isItemAlreadyExists) {
        state.cartItems = state.cartItems.map((item: any) => {
          if (item._id === itemToAdd._id) {
            return itemToAdd;
          }
          return item;
        });
      } else {
        state.cartItems = [...state.cartItems, itemToAdd];
      }
      return updateCartBilling(state);
    },

    deleteItemFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(item => item._id !== id);
      return updateCartBilling(state);
    }
  },
});

export const { addItemToCart, deleteItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
