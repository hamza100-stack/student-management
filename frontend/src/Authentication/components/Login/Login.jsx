import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReCAPTCHA from "react-google-recaptcha";
import "./Login.css"; // Optional for custom styles
import axios from "axios";
import { saveToken } from "../../../services/authService";

const Login = () => {
    const recaptchaRef = useRef(null);

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [captcha, setCaptcha] = useState(generateCaptcha());
    const [userCaptcha, setUserCaptcha] = useState("");
    const [error, setError] = useState("");
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [captchaToken, setCaptchaToken] = useState("");

    useEffect(() => {
        // setCaptcha(generateCaptcha());
    }, []);

    const handleCaptchaChange = (value) => {
        console.log("Captcha value (token):", value);
        if (value) {
            setCaptchaToken(value);
            setCaptchaVerified(true);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        if (!captchaVerified || !captchaToken) {
            setError("Please verify the CAPTCHA");
            return;
        }

        if (!username || !password) {
            setError("❌ All fields are required.");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    username,
                    password,
                    token: captchaToken,
                }
            );

            // console.log(res);
            if (res.data.message === "Login successful") {
                alert("✅ Login successful!");
                // sessionStorage.setItem("accessToken", res.data.token);
                saveToken(res.data.token);
                navigate("/dashboard");
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            console.error(err);
            setError("❌ Login failed. Please try again -- frontend.");
        } finally {
            // Optional: reset captcha after attempt
            setCaptchaVerified(false);
            setCaptchaToken("");
            if (recaptchaRef.current) {
                recaptchaRef.current.reset(); // 🔁 Resets the CAPTCHA
            }
        }
    };

    const handleForgotPassword = () => {
        navigate("/auth/forgot-pass");
    };
    const handleRegister = () => {
        navigate("/auth/register");
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div
                className="card p-4 shadow-lg"
                style={{ maxWidth: "400px", width: "100%" }}
            >
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone or Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LdmIBkrAAAAADOdAruK4PzwKqqVFQ4wjM53qdDZ"
                            onChange={handleCaptchaChange}
                        />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <button
                        type="submit"
                        className="btn btn-primary w-100 mb-2"
                    >
                        Login
                    </button>
                    <br></br>

                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100"
                        onClick={handleRegister}
                    >
                        Sign Up
                    </button>
                    <br></br>
                    <br></br>

                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100"
                        onClick={handleForgotPassword}
                    >
                        Forgot Password?
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
