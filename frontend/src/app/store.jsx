import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import sidebarReducer from "../features/dashboard/sidebarSlice";
import loaderReducer from "../features/loaderSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        loader: loaderReducer,
    },
});

export default store;
