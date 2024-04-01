import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProgressBarState {
  value: boolean;
}

const initialState: ProgressBarState = {
  value: false,
};

const ProgressBarSlice = createSlice({
  name: 'progressBarr',
  initialState,
  reducers: {
    changeProgressBarState: (
      state,
      action: PayloadAction<ProgressBarState>,
    ) => {
      state.value = action.payload.value;
    },
  },
});

export const { changeProgressBarState } = ProgressBarSlice.actions;

export default ProgressBarSlice.reducer;
