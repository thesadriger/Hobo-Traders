import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enabled: false,
  selectedComponent: null, // для хранения выбранного компонента
};

const editModeSlice = createSlice({
  name: 'editMode',
  initialState,
  reducers: {
    setEditMode: (state, action) => {
      state.enabled = action.payload;
      if (!action.payload) state.selectedComponent = null;
    },
    selectComponent: (state, action) => {
      state.selectedComponent = action.payload;
    },
    resetSelectedComponent: (state) => {
      state.selectedComponent = null;
    },
  },
});

export const { setEditMode, selectComponent, resetSelectedComponent } = editModeSlice.actions;
export default editModeSlice.reducer; 