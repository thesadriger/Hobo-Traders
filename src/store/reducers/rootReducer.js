// reducers/index.js
import { combineReducers } from 'redux';
import totalWinningsReducer from './totalWinningsReducer';

const rootReducer = combineReducers({
  totalWinningsPerCoin: totalWinningsReducer,
});

export default rootReducer;
