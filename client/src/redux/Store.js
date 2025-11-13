import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './SidebarSlice';
import globalReducer from './DarkModeSlice';
import userReducer from './UserSlice';
import mobileMenuReducer from './MobileMenuSlice';

export const Store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    mobileMenu: mobileMenuReducer,
    global: globalReducer,
    user: userReducer,
  },
});
