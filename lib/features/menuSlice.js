'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuOpen: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: (state, action) => {
      state.menuOpen = action.payload;
    },
  },
});
export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
