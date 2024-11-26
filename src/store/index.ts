import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from 'store/sidebarSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default store;
