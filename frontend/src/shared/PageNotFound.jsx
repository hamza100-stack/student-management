import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            {/* Page Not Found GIF */}
            <img
                src="/assets/page-not-found.gif" // Place your GIF in the public folder with this name
                alt="Page Not Found"
                className="img-fluid mb-4"
                style={{ maxWidth: "500px" }}
            />

            {/* Login Button */}
            <Link to="/auth/login" className="btn btn-primary">
                Go to Login
            </Link>
        </div>
    );
};
export default PageNotFound;
