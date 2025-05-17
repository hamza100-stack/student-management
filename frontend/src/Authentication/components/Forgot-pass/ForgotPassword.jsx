import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { forgotUser } from "../../../services/authService";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!email) {
            setError("❌ Email is required.");
            return;
        }

        try {
            // Replace this with actual API call if you have one
            // const res = await axios.post("http://localhost:5000/api/forgot-password", {
            //     email,
            // });

            const res = await forgotUser(email);

            if (res.success) {
                setMessage("✅ Password reset link sent to your email.");
            } else {
                setError(res.message || "Something went wrong.");
            }
        } catch (err) {
            console.error(err);
            setError("❌ Failed to send reset email. Please try again.");
        }
    };

    const handleBackToLogin = () => {
        navigate("/auth/login");
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div
                className="card p-4 shadow-lg"
                style={{ maxWidth: "400px", width: "100%" }}
            >
                <h3 className="text-center mb-4">Forgot Password</h3>
                <form onSubmit={handleResetPassword}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {message && (
                        <div className="alert alert-success">{message}</div>
                    )}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <button
                        type="submit"
                        className="btn btn-primary w-100 mb-2"
                    >
                        Reset Password
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100"
                        onClick={handleBackToLogin}
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
