import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    totalCost: 0,
    // totalValue: function () {
    //   sum = 0;
    //   this.data.forEach((item) => {
    //     sum += item.price;
    //   });
    //   return sum;
    // },
  },
  reducers: {
    add(state, action) {
      state.totalCost += action.payload.price;
      state.data.push(action.payload);
    },
    remove(state, action) {
      let item = state.data.findIndex((item) => item.id === action.payload);
      state.totalCost -= state.data[item].price;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
