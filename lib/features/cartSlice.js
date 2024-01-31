'use client';
import { createSlice, current } from '@reduxjs/toolkit';

const getLocalCartData = () => {
  if (typeof window !== 'undefined') {
    let localCartData = localStorage.getItem('zara-cart');
    if (!localCartData) return [];
    else {
      const local = JSON.parse(localCartData);
      return local.products;
    }
  }
  return [];
};

const initialState = {
  products: getLocalCartData(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      let found = false;
      for (let i = 0; i < state.products.length; i++) {
        if (
          state.products[i]?.id === action.payload.id &&
          state.products[i]?.size === action.payload.size
        ) {
          found = true;
          state.products[i].quantity += 1;
        }
      }
      if (!found) state.products.push(action.payload);
      localStorage.setItem('zara-cart', JSON.stringify(current(state)));
    },
    remove: (state, action) => {
      for (let i = 0; i < state.products.length; i++) {
        if (
          state.products[i]?.id === action.payload.id &&
          state.products[i]?.size === action.payload.size
        ) {
          if (state.products[i].quantity === 1) {
            state.products.splice(i, 1);
          } else {
            state.products[i].quantity -= 1;
          }
        }
      }
      localStorage.setItem('zara-cart', JSON.stringify(current(state)));
    },
    deleteItem: (state, action) => {
      let i = -1;
      let found = false;
      for (i = 0; i < state.products.length; i++) {
        if (
          state.products[i]?.id === action.payload.id &&
          state.products[i]?.size === action.payload.size
        ) {
          found = true;
          break;
        }
      }
      if (found) delete state.products[i];
      localStorage.setItem('zara-cart', JSON.stringify(current(state)));
    },
    empty: (state) => {
      state.products = [];
      localStorage.setItem('zara-cart', JSON.stringify(current(state)));
    },
  },
});

export const { add, remove, deleteItem, empty } = cartSlice.actions;
export default cartSlice.reducer;
