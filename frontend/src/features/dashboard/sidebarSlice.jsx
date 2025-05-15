// src/features/dashboard/sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarVisible: true, // set to true by default for wider screens
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarVisible = !state.sidebarVisible;
        },
        // setSidebarVisible: (state, action) => {
        //     state.sidebarVisible = action.payload;
        // },
    },
});

export const { toggleSidebar, setSidebarVisible } = sidebarSlice.actions;
export default sidebarSlice.reducer;
