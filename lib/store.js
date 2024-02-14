'use client';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import menuReducer from './features/menuSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
  },
});

export default store;
