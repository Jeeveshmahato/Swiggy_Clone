import { createSlice, current } from "@reduxjs/toolkit";
// current is used toknow the curent state in redux
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      console.log(current(state));
    },
    deleteItem: (state) => {
      state.items.pop();
    },
    // //originalState = {items: ["pizza"]}
    // clearCart: (state, action) => {
    //   //RTK - either Mutate the existing  state or return a new State
    //   // state.items.length = 0; // originalState = []

    //   return { items: [] }; // this new object will be replaced inside originalState = { items: [] }
    clearItem: (state) => {
      state.items.length = 0;
      console.log(current(state));
    },
  },
});
export const { addItem, deleteItem, clearItem } = CartSlice.actions;
export default CartSlice.reducer;
