// src/services/axiosInterceptor.js
import axios from "axios";
import { getToken, clearTokenLocalStoage } from "./authService";
import store from "../app/store"; // 👈 Access store directly
import { showLoader, hideLoader } from "../features/loaderSlice";

const axiosInterceptor = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Request interceptor
axiosInterceptor.interceptors.request.use(
    (config) => {
        store.dispatch(showLoader());
        // const token = getToken();
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        store.dispatch(hideLoader());
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInterceptor.interceptors.response.use(
    (response) => {
        store.dispatch(hideLoader());
        return response;
    },
    (error) => {
        store.dispatch(hideLoader());
        if (error.response?.status === 401) {
            // clearTokenLocalStoage();
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInterceptor;
