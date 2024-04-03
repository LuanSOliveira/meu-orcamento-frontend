import { configureStore } from '@reduxjs/toolkit';
import ProgressBarSlice from './reducers/ProgressBarSlice';
import SidebarSlice from './reducers/SidebarSlice';

const store = configureStore({
  reducer: {
    progressBar: ProgressBarSlice,
    sidebar: SidebarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
