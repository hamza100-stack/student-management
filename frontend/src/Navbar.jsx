import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "./features/dashboard/sidebarSlice";
import Logout from "./Authentication/components/Logout/Logout";

const Navbar = () => {
    const dispatch = useDispatch();

    // ✅ Global state for sidebar visibility
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };
    if (isAuthenticated) {
        return (
            <nav className="navbar navbar-dark bg-dark px-3">
                <button
                    className="btn btn-outline-light d-md-none"
                    onClick={handleToggleSidebar}
                >
                    ☰
                </button>
                <span className="navbar-brand">Student Management Portal</span>
                <Logout></Logout>
                {/* <button className="btn btn-outline-light ml-auto">Logout</button> */}
            </nav>
        );
    } else {
        return;
    }
};

export default Navbar;
