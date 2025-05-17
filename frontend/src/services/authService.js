// src/services/authService.js

import axiosInterceptor from "./axiosInterceptor";

let logoutCallback = null;
let logoutTimer = null;

export const setLogoutCallback = (callback) => {
    logoutCallback = callback;
};

export const saveToken = (token) => {
    localStorage.setItem("accessToken", token);

    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = payload.exp * 1000; // convert to ms

    const currentTime = Date.now();
    const timeout = expiryTime - currentTime;

    if (logoutTimer) clearTimeout(logoutTimer); // reset any previous

    logoutTimer = setTimeout(() => {
        if (logoutCallback) logoutCallback();
    }, timeout);
};

export const clearTokenLocalStoage = () => {
    localStorage.removeItem("accessToken");
    if (logoutTimer) clearTimeout(logoutTimer);
};

export const getToken = () => {
    return localStorage.getItem("accessToken");
};

// ====================================================================

export const registerUser = async (FormData) => {
    const response = await axiosInterceptor.post("/auth/register", FormData);
    return response.data;
};

export const loginUser = async ({ username, password, token }) => {
    const response = await axiosInterceptor.post("/auth/login", {
        username,
        password,
        token,
    });
    return response.data;
};
export const forgotUser = async (email) => {
    const response = await axiosInterceptor.post(
        "/auth/forgot-password",
        email
    );
    return response.data;
};
