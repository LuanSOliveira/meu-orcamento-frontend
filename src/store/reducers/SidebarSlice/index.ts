import { createSlice } from '@reduxjs/toolkit';

interface SideBarState {
  value: boolean;
}

const initialState: SideBarState = {
  value: true,
};

const SideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    changeSideBarState: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeSideBarState } = SideBarSlice.actions;

export default SideBarSlice.reducer;
