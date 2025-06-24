import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // coinKey: price
  // dailyPrices: { coinKey: price }
  dailyPrices: {},
};

const coinPricesSlice = createSlice({
  name: 'coinPrices',
  initialState,
  reducers: {
    setCoinPrice: (state, action) => {
      const { coinKey, price } = action.payload;
      state[coinKey] = price;
    },
    setMultipleCoinPrices: (state, action) => {
      // action.payload = { coinKey1: price1, coinKey2: price2, ... }
      Object.entries(action.payload).forEach(([coinKey, price]) => {
        state[coinKey] = price;
      });
    },
    setDailyPrice: (state, action) => {
      const { coinKey, price } = action.payload;
      state.dailyPrices[coinKey] = price;
    },
  },
});

export const { setCoinPrice, setMultipleCoinPrices, setDailyPrice } = coinPricesSlice.actions;
export default coinPricesSlice.reducer; 