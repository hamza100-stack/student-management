// src/Authentication/components/Logout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../../services/authService";

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate("/auth/login");
  };

  return <button onClick={logout}>Logout</button>;
};

export default Logout;
