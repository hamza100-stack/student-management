import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticationRoutes from "./Authentication/AuthenticationRoutes";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth/*" element={<AuthenticationRoutes />} />
                {/* You can add other routes here */}
            </Routes>
        </Router>
    );
};

export default App;
