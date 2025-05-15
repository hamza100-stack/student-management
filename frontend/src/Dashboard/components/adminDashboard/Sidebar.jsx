import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

const Sidebar = ({ visible }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(
        window.innerWidth < 1024
    );

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const sidebarClass = `${styles.sidebar} ${
        !visible && isSmallScreen ? styles.sidebarHidden : ""
    }`;

    return (
        <div className={sidebarClass}>
            <h5 className="text-dark">Admin Menu</h5>
            <NavLink to="/dashboard/admin" className={styles.navLink}>
                Admin Dashboard
            </NavLink>
            <NavLink
                to="/dashboard/admin/users-list"
                className={styles.navLink}
            >
                Users
            </NavLink>
            <NavLink to="/admin/add-course" className={styles.navLink}>
                Add Course
            </NavLink>
            <NavLink to="/admin/remove-course" className={styles.navLink}>
                Remove Course
            </NavLink>
            <NavLink to="/admin/view-reports" className={styles.navLink}>
                View Reports
            </NavLink>
        </div>
    );
};

export default Sidebar;
