import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './SidebarSlice';
import globalReducer from './DarkModeSlice';
import userReducer from './UserSlice';

export const Store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    global: globalReducer,
    user: userReducer,
  },
});
