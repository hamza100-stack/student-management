import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import sidebarReducer from "../features/dashboard/sidebarSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
    },
});

export default store;
