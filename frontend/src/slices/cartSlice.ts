import { createSlice } from "@reduxjs/toolkit";
import { updateCartBilling } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal", itemsPrice: 0, taxPrice: 0, shippingPrice: 0, totalPrice: 0 };

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
    },

    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    updatePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    }
  },
});

export const { addItemToCart, deleteItemFromCart, updateShippingAddress, updatePaymentMethod } = cartSlice.actions;
export default cartSlice.reducer;
