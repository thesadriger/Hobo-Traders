// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from '../store/slices/balanceSlice';
import userReducer from './slices/userSlice';
import indicatorsReducer from '../store/slices/indicatorsSlice';
import levelReducer from '../store/slices/levelSlice';
import totalWinningsReducer from '../store/slices/totalWinningsSlice';
import lastChangedIndicatorReducer from './slices/lastChangedIndicatorSlice';
import newTasksBadgeReducer from './slices/newTasksBadgeSlice';
import coinPricesReducer from './slices/coinPricesSlice';
import customColorsReducer from './slices/customColorsSlice';
import editModeReducer from './slices/editModeSlice';
// Импортируйте другие редьюсеры, если они есть


const store = configureStore({
  reducer: {
    balance: balanceReducer,
    user: userReducer,
    indicators: indicatorsReducer,
    level: levelReducer,
    totalWinnings: totalWinningsReducer,
    lastChangedIndicator: lastChangedIndicatorReducer,
    newTasksBadge: newTasksBadgeReducer,
    coinPrices: coinPricesReducer,
    customColors: customColorsReducer,
    editMode: editModeReducer,
    // другие редьюсеры
  },
  // Подключение Redux DevTools Extension для удобной отладки
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
