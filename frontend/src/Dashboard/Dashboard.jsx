import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardComponent from "./components/DashboardComponent";

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<DashboardComponent />} />
        </Routes>
    );
};

export default DashboardRoutes;
