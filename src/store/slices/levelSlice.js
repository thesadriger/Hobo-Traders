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
      state.level = parseFloat((state.level + action.payload).toFixed(3));
    },
  },
});

export const { increaseLevel } = levelSlice.actions;
export default levelSlice.reducer;
