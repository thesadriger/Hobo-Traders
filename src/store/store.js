// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from '../store/slices/balanceSlice';
import indicatorsReducer from '../store/slices/indicatorsSlice';
import levelReducer from '../store/slices/levelSlice';
import totalWinningsReducer from '../store/slices/totalWinningsSlice';
// Импортируйте другие редьюсеры, если они есть


const store = configureStore({
  reducer: {
    balance: balanceReducer,
    indicators: indicatorsReducer,
    level: levelReducer,
    totalWinnings: totalWinningsReducer,
    // другие редьюсеры
  },
  // Подключение Redux DevTools Extension для удобной отладки
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
