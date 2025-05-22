// src/Authentication/components/Logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearTokenLocalStoage } from "../../../services/authService";
import { useDispatch } from "react-redux";
import { clearToken } from "../../../features/auth/authSlice";

const Logout = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logout = () => {
        clearTokenLocalStoage();
        dispatch(clearToken());
        navigate("/auth/login");
    };

    return (
        <button className="btn btn-light border" onClick={logout}>
            Logout
        </button>
    );
};

export default Logout;
