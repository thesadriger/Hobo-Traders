// src/store/reducers/totalWinningsReducer.js
const initialState = {};

const totalWinningsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TOTAL_WINNINGS':
      const { coinKey, amount } = action.payload;
      return {
        ...state,
        [coinKey]: (state[coinKey] || 0) + amount,
      };
    default:
      return state;
  }
};

export default totalWinningsReducer;
