// src/store/actions.js
export const updateTotalWinnings = (coinKey, amount) => ({
  type: 'UPDATE_TOTAL_WINNINGS',
  payload: { coinKey, amount },
});
