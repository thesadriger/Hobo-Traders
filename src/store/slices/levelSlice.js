// src/store/slices/levelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  level: 0,
};

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    increaseLevel: (state, action) => {
      state.level += action.payload;
    },
  },
});

export const { increaseLevel } = levelSlice.actions;
export default levelSlice.reducer;
