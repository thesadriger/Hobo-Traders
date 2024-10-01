// src/store/slices/indicatorsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  health: 0,
  fun: 0,
  food: 0,
};

const indicatorsSlice = createSlice({
  name: 'indicators',
  initialState,
  reducers: {
    increaseHealth: (state, action) => {
      state.health = Math.min(state.health + action.payload, 100);
    },
    increaseFun: (state, action) => {
      state.fun = Math.min(state.fun + action.payload, 100);
    },
    increaseFood: (state, action) => {
      state.food = Math.min(state.food + action.payload, 100);
    },
  },
});

export const { increaseHealth, increaseFun, increaseFood } = indicatorsSlice.actions;
export default indicatorsSlice.reducer;
