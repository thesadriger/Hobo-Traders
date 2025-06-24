import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // coinId: [ { time, price }, ... ]
};

const coinHistorySlice = createSlice({
  name: 'coinHistory',
  initialState,
  reducers: {
    setCoinHistory: (state, action) => {
      // action.payload = { coinId, history: [ { time, price }, ... ] }
      const { coinId, history } = action.payload;
      state[coinId] = history;
    },
    addCoinHistoryPoint: (state, action) => {
      // action.payload = { coinId, point: { time, price }, maxLength }
      const { coinId, point, maxLength } = action.payload;
      if (!state[coinId]) state[coinId] = [];
      state[coinId].push(point);
      if (state[coinId].length > maxLength) {
        state[coinId] = state[coinId].slice(state[coinId].length - maxLength);
      }
    },
  },
});

export const { setCoinHistory, addCoinHistoryPoint } = coinHistorySlice.actions;
export default coinHistorySlice.reducer; 