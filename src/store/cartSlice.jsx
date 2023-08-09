import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    add(state, action) {
      let idx = state.data.findIndex((item) => item.id == action.payload.id);
      if (idx !== -1) {
        state.data[idx].qty += 1;
      } else {
        action.payload.qty = 1;
        state.data.push(action.payload);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.data));
    },
    remove(state, action) {
      let item = state.data.find((item) => item.id === action.payload);
      if (item.qty == 1) {
        state.data = state.data.filter((item) => item.id !== action.payload);
      } else {
        let index = state.data.findIndex((item) => item.id === action.payload);
        state.data[index].qty -= 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.data));
    },
    clearCart(state, action) {
      state.data = [];
      localStorage.setItem("cartItems", null);
    },
  },
});

export const { add, remove, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
