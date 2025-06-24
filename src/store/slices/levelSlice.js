// src/store/slices/levelSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Таблица шагов для перехода на следующий уровень (индекс = текущий уровень)
const stepsPerLevel = [
  0,  // 0 уровень (не используется)
  10, 15, 23, 35, 53, 80, 120, 180, 270, 324, 389, 467, 561, 674, 809, 971, 1166, 1400, 1680, 2016,
  2420, 2904, 3485, 4182, 5019, 6023, 7228, 8674, 10409, 12491, 13741, 15116, 16628, 18291, 20121,
  22134, 24348, 26783, 29462, 32409, 35650, 39215, 43137, 47451, 52197, 57417, 63159, 69475, 76423,
  84066, 92473, 101721, 111894, 123084, 135393, 148933, 163827, 180210, 198232, 218056, 228959,
  240407, 252428, 265050, 278303, 292219, 306830, 322172, 338281, 355196, 372956, 391604, 411185,
  431745, 453333, 476000, 499800, 524790, 551030, 578582, 590154, 601958, 613998, 626278, 638804,
  651581, 664613, 677906, 691465, 705295, 719401, 733790, 748466, 763436, 778705, 794280, 810166,
  826370, 842898
];

const initialState = {
  level: 1,
  progress: 0,
  justUnlockedTaskKey: null,
};

// Функция для расчёта требуемого прогресса для следующего уровня
export function getNextLevelProgress(level) {
  return stepsPerLevel[level] || stepsPerLevel[stepsPerLevel.length - 1];
}

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    increaseLevel: (state, action) => {
      // action.payload — сколько прогресса добавить (обычно 1)
      const add = action.payload || 1;
      state.progress += add;
      let need = getNextLevelProgress(state.level);
      while (state.progress >= need) {
        state.progress -= need;
        state.level += 1;
        need = getNextLevelProgress(state.level);
      }
    },
    setJustUnlockedTaskKey(state, action) {
      state.justUnlockedTaskKey = action.payload;
    },
    resetLevel: (state) => {
      state.level = 1;
      state.progress = 0;
    },
    setLevel: (state, action) => {
      state.level = action.payload.level;
      state.progress = action.payload.progress;
    },
  },
});

export const { increaseLevel, setJustUnlockedTaskKey, resetLevel, setLevel } = levelSlice.actions;
export default levelSlice.reducer;
