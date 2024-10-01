// src/store/slices/totalWinningsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalWinningsPerCoin: {},
};

const totalWinningsSlice = createSlice({
  name: 'totalWinnings',
  initialState,
  reducers: {
    updateTotalWinnings: (state, action) => {
      const { coinKey, amount } = action.payload;
      if (state.totalWinningsPerCoin[coinKey]) {
        state.totalWinningsPerCoin[coinKey] += amount;
      } else {
        state.totalWinningsPerCoin[coinKey] = amount;
      }
    },
  },
});

export const { updateTotalWinnings } = totalWinningsSlice.actions;
export default totalWinningsSlice.reducer;
