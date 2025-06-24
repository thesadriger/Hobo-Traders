import { createSlice } from '@reduxjs/toolkit';

const lastChangedIndicatorSlice = createSlice({
  name: 'lastChangedIndicator',
  initialState: null, // 'health' | 'food' | 'fun' | null
  reducers: {
    setLastChangedIndicator: (state, action) => action.payload,
    resetLastChangedIndicator: () => null,
  },
});

export const { setLastChangedIndicator, resetLastChangedIndicator } = lastChangedIndicatorSlice.actions;
export default lastChangedIndicatorSlice.reducer;
