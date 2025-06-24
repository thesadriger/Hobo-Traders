import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  food: 0,
  fun: 0,
  health: 0,
  appartaments: 0,
  cars: 0,
  education: 0,
};

const newTasksBadgeSlice = createSlice({
  name: 'newTasksBadge',
  initialState,
  reducers: {
    setNewTasks(state, action) {
      // action.payload = { food, fun, health, appartaments, cars, education }
      for (const key of ['food', 'fun', 'health', 'appartaments', 'cars', 'education']) {
        if (typeof action.payload[key] === 'number' && action.payload[key] > 0) {
          state[key] += action.payload[key];
        }
      }
    },
    clearNewTasks(state, action) {
      // action.payload = 'food' | 'fun' | 'health' | 'appartaments' | 'cars' | 'education'
      if (action.payload) {
        state[action.payload] = 0;
      }
    },
  },
});

export const { setNewTasks, clearNewTasks } = newTasksBadgeSlice.actions;
export default newTasksBadgeSlice.reducer;
