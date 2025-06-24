import { createSlice } from '@reduxjs/toolkit';

// Функция для загрузки состояния из localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('customColors');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

// Функция для сохранения состояния в localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('customColors', serializedState);
  } catch (err) {
    // ignore write errors
  }
};

const initialState = loadState();

const customColorsSlice = createSlice({
  name: 'customColors',
  initialState,
  reducers: {
    setComponentColor: (state, action) => {
      const { componentKey, color } = action.payload;
      state[componentKey] = color;
      saveState(state);
    },
    resetComponentColor: (state, action) => {
      const { componentKey } = action.payload;
      delete state[componentKey];
      saveState(state);
    },
    resetAllColors: (state) => {
      Object.keys(state).forEach((key) => delete state[key]);
      saveState(state);
    },
  },
});

export const { setComponentColor, resetComponentColor, resetAllColors } = customColorsSlice.actions;
export default customColorsSlice.reducer; 