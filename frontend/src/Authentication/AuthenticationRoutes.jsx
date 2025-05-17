import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/Forgot-pass/ForgotPassword";
import PageNotFound from "../shared/PageNotFound";

const AuthenticationRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-pass" element={<ForgotPassword />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default AuthenticationRoutes;
