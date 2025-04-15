import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticationRoutes from "./Authentication/AuthenticationRoutes";
import DashboardRoutes from "./Dashboard/Dashboard";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth/*" element={<AuthenticationRoutes />} />
                <Route path="/dashboard/*" element={<DashboardRoutes />} />
                {/* You can add other routes here */}
            </Routes>
        </Router>
    );
};

export default App;
