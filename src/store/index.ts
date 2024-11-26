import { configureStore } from '@reduxjs/toolkit';
import sidebarFilterReducer from 'store/sidebarFilterSlice';

const store = configureStore({
  reducer: {
    sidebarFilter: sidebarFilterReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default store;
