import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import AuthenticationRoutes from "./Authentication/AuthenticationRoutes";
import DashboardRoutes from "./Dashboard/DashboardRoutes";
import {
    setLogoutCallback,
    saveToken,
    getToken,
    clearTokenLocalStoage,
} from "./services/authService";
import { setToken } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 👇 Wrapper to use hooks like useNavigate
const AppWithAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Setup logout callback when token expires
        setLogoutCallback(() => {
            // clearToken();
            clearTokenLocalStoage();
            alert("Session expired. Please login again.");
            navigate("/auth/login");
        });

        // Check and reset logout timer if token exists
        const token = getToken();
        if (token) {
            saveToken(token);
            dispatch(setToken(token));
        }
    }, [navigate]);

    return (
        <Routes>
            <Route path="/auth/*" element={<AuthenticationRoutes />} />
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
    );
};

const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <AppWithAuth />
            </Router>

            {/* ToastContainer should appear once globally */}
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default App;
