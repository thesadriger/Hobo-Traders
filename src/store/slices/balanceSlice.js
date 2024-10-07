// src/store/slices/balanceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usdt: 1000,
  btc: 0,
  hbtrd: 0,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    // Добавляем проверки перед уменьшением баланса
    addUSDT: (state, action) => {
      state.usdt += action.payload;
    },
    addBTC: (state, action) => {
      state.btc += action.payload;
    },
    addHBTRD: (state, action) => {
      state.hbtrd += action.payload;
    },
    decreaseUSDT: (state, action) => {
      state.usdt = Math.max(state.usdt - action.payload, 0);
    },
    decreaseBTC: (state, action) => {
      state.btc = Math.max(state.btc - action.payload, 0);
    },
    decreaseHBTRD: (state, action) => {
      state.hbtrd = Math.max(state.hbtrd - action.payload, 0);
    },
  },
});

export const {
  addUSDT,
  addBTC,
  addHBTRD,
  decreaseUSDT,
  decreaseBTC,
  decreaseHBTRD,
} = balanceSlice.actions;

export default balanceSlice.reducer;
