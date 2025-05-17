import React from "react";
import { useSelector } from "react-redux";

const GlobalLoader = () => {
    const loading = useSelector((state) => state.loader.loading);

    if (!loading) return null;

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-white bg-opacity-75 d-flex justify-content-center align-items-center"
            style={{ zIndex: 1050 }}
        >
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default GlobalLoader;
