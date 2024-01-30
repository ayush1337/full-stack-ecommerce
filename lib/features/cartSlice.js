'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      let found = false;
      for (let i = 0; i < state.products.length; i++) {
        if (state.products[i]?.id === action.payload.id) {
          found = true;
          state.products[i].quantity += 1;
          break;
        }
      }
      if (!found) state.products.push(action.payload);
    },
    remove: (state, action) => {
      for (let i = 0; i < state.products.length; i++) {
        if (state.products[i]?.id === action.payload) {
          if (state.products[i].quantity === 1) {
            state.products.splice(i, 1);
          } else {
            state.products[i].quantity -= 1;
          }
        }
      }
    },
    deleteItem: (state, action) => {
      let i = -1;
      let found = false;
      for (i = 0; i < state.products.length; i++) {
        if (state.products[i]?.id === action.payload) {
          found = true;
          break;
        }
      }
      if (found) delete state.products[i];
    },
    empty: (state) => {
      state.products = [];
    },
  },
});

export const { add, remove, deleteItem, empty } = cartSlice.actions;
export default cartSlice.reducer;
