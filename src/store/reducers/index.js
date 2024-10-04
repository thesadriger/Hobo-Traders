// src/store/reducers/index.js
import { combineReducers } from 'redux';
import balanceReducer from '../slices/balanceSlice';
import indicatorsReducer from '../slices/indicatorsSlice';
import levelReducer from '../slices/levelSlice';
import totalWinningsReducer from '../slices/totalWinningsSlice';

const rootReducer = combineReducers({
  balance: balanceReducer,
  indicators: indicatorsReducer,
  level: levelReducer,
  totalWinnings: totalWinningsReducer,
});

export default rootReducer;
