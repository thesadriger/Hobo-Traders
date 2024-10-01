// src/store/slices/balanceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usdt: 0,
  btc: 0,
  hbtrd: 0,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    addUSDT: (state, action) => {
      state.usdt += action.payload;
    },
    addBTC: (state, action) => {
      state.btc += action.payload;
    },
    addHBTRD: (state, action) => {
      state.hbtrd += action.payload;
    },
  },
});

export const { addUSDT, addBTC, addHBTRD } = balanceSlice.actions;
export default balanceSlice.reducer;
