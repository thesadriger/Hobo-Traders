// src/store/reducers/index.js
import { combineReducers } from 'redux';
import balanceReducer from '../slices/balanceSlice';
import indicatorsReducer from '../slices/indicatorsSlice';
import levelReducer from '../slices/levelSlice';
import totalWinningsReducer from '../slices/totalWinningsSlice';
import coinHistory from '../slices/coinHistorySlice';

const rootReducer = combineReducers({
  balance: balanceReducer,
  indicators: indicatorsReducer,
  level: levelReducer,
  totalWinnings: totalWinningsReducer,
  coinHistory,
});

export default rootReducer;
