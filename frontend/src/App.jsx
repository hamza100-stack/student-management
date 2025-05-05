import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AuthenticationRoutes from "./Authentication/AuthenticationRoutes";
import DashboardRoutes from "./Dashboard/Dashboard";
import { setLogoutCallback, saveToken, getToken, clearToken } from "./services/authService";

// 👇 Wrapper to use hooks like useNavigate
const AppWithAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Setup logout callback when token expires
        setLogoutCallback(() => {
            clearToken();
            alert("Session expired. Please login again.");
            navigate("/auth/login");
        });

        // Check and reset logout timer if token exists
        const token = getToken();
        if (token) {
            saveToken(token);
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
        <Router>
            <AppWithAuth />
        </Router>
    );
};

export default App;




// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthenticationRoutes from "./Authentication/AuthenticationRoutes";
// import DashboardRoutes from "./Dashboard/Dashboard";


// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/auth/*" element={<AuthenticationRoutes />} />
//                 <Route path="/dashboard/*" element={<DashboardRoutes />} />
//                 {/* You can add other routes here */}
//             </Routes>
//         </Router>
//     );
// };

// export default App;
