import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : {cartItems: []};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const itemToAdd = action.payload;

            // Check if item to add already exists in the cart
            const isItemAlreadyExists = state.cartItems.some((item: any) => item._id === itemToAdd._id);

            if(isItemAlreadyExists) {
                state.cartItems = state.cartItems.map((item: any) => {
                    if(item._id === itemToAdd._id) {
                        return itemToAdd;
                    }
                    return item;
                });

                //TODO - Check for utils file
                state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
                state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
                state.taxPrice = 0.15 * state.itemsPrice;
                state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;

                localStorage.setItem('cart', JSON.stringify(state));

            } else {
                state.cartItems = [...state.cartItems, itemToAdd];

            }
        }
    }
});

export const {addItemToCart} = cartSlice.actions;
export default cartSlice.reducer;