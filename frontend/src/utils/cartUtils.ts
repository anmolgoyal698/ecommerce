export const updateCartBilling = (state) => {
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
  state.taxPrice = 0.15 * state.itemsPrice;
  state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
