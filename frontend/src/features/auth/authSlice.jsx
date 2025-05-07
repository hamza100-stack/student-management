import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated = true;
        },
        clearToken: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
