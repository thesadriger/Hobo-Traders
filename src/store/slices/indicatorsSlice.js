// src/store/slices/indicatorsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  health: 100,
  fun: 100,
  food: 100,
};

const indicatorsSlice = createSlice({
  name: 'indicators',
  initialState,
  reducers: {
    decreaseHealth: (state, action) => {
      state.health = Math.max(state.health - action.payload, 0);
    },
    decreaseFun: (state, action) => {
      state.fun = Math.max(state.fun - action.payload, 0);
    },
    decreaseFood: (state, action) => {  // Добавляем этот редьюсер
      state.food = Math.max(state.food - action.payload, 0);
    },
    increaseHealth: (state, action) => {
      state.health = Math.min(state.health + action.payload, 100);
    },
    increaseFun: (state, action) => {
      state.fun = Math.min(state.fun + action.payload, 100);
    },
    increaseFood: (state, action) => {
      state.food = Math.min(state.food + action.payload, 100);
    },
    resetIndicators: (state) => {
      state.health = 100;
      state.fun = 100;
      state.food = 100;
    },
  },
});

export const { decreaseHealth, decreaseFun, decreaseFood, increaseFood, increaseFun, increaseHealth, resetIndicators } = indicatorsSlice.actions;
export default indicatorsSlice.reducer;
