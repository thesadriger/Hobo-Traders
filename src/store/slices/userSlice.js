// src/store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Другие пользовательские состояния
  // balance: { usdt: 0, btc: 0, hbtrd: 0 }, // Если хотите хранить баланс здесь
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Пример других действий
    // setUserInfo: (state, action) => { ... },
  },
});

export const {
  // export your user actions here
} = userSlice.actions;

export default userSlice.reducer;
