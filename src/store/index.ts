import { configureStore } from '@reduxjs/toolkit';
import ProgressBarSlice from './reducers/ProgressBarSlice';

const store = configureStore({
  reducer: {
    progressBar: ProgressBarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
