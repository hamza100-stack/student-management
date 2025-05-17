import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardComponent from "./components/DashboardComponent";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import UsersList from "./components/users/UsersList";
import PageNotFound from "../shared/PageNotFound";

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<DashboardComponent />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users-list" element={<UsersList />} />
            <Route path="*" element={<PageNotFound />} />

        </Routes>
    );
};

export default DashboardRoutes;
