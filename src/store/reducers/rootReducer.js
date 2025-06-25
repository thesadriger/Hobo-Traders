// reducers/index.js
import { combineReducers } from 'redux';
import totalWinningsReducer from './totalWinningsReducer';
import purchasedItemsReducer from '../slices/purchasedItemsSlice';

const rootReducer = combineReducers({
  totalWinningsPerCoin: totalWinningsReducer,
  purchasedItems: purchasedItemsReducer,
});

export default rootReducer;
