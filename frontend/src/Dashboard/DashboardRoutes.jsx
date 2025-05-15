import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardComponent from "./components/DashboardComponent";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import UsersList from "./components/users/UsersList";

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<DashboardComponent />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users-list" element={<UsersList />} />
        </Routes>
    );
};

export default DashboardRoutes;
