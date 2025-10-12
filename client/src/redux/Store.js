import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './DarkModeSlice';
import userReducer from './UserSlice';

export const Store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
  },
});
