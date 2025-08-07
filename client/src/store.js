import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import businessTypeReducer from "./features/businessTypes/businessTypeSlice";
import businessReducer from "./features/businesses/businessSlice";
import usersReducer from "./features/users/userSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import userReducer from "./features/user/userSlice";
import settingsReducer from "./features/settings/settingsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    businessTypes: businessTypeReducer,
    businesses: businessReducer,
    users: usersReducer,
    dashboard: dashboardReducer,
    user: userReducer,
    settings: settingsReducer,
  },
});

export default store;
