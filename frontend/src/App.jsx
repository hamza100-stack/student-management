import React, { useEffect } from "react";
import { lazy, Suspense } from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import AuthenticationRoutes from "./Authentication/AuthenticationRoutes";
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
import Login from "./Authentication/components/Login/Login";
import PageNotFound from "./shared/PageNotFound";
import GlobalLoader from "./shared/GlobalLoader";

// 👇 Wrapper to use hooks like useNavigate
const AppWithAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const DashboardRoutes = lazy(() => import("./Dashboard/DashboardRoutes"));

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

            <Route
                path="/dashboard/*"
                element={
                    <Suspense
                        fallback={
                            <div className="text-center mt-5">
                                Loading Dashboard...
                            </div>
                        }
                    >
                        <DashboardRoutes />
                    </Suspense>
                }
            />
            <Route path="" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
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

            <GlobalLoader /> {/* ⬅️ Always available */}
            {/* ToastContainer should appear once globally */}
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default App;
