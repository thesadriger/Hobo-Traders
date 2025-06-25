import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appartament: {},
  education: {},
  car: {},
  food: {},
  fun: {},
  health: {},
  shop: {},
};

const purchasedItemsSlice = createSlice({
  name: 'purchasedItems',
  initialState,
  reducers: {
    purchaseItem: (state, action) => {
      const { category, itemKey } = action.payload;
      if (!state[category]) state[category] = {};
      state[category][itemKey] = true;
    },
    resetPurchases: (state) => {
      Object.keys(state).forEach(cat => { state[cat] = {}; });
    },
  },
});

export const { purchaseItem, resetPurchases } = purchasedItemsSlice.actions;
export default purchasedItemsSlice.reducer; 