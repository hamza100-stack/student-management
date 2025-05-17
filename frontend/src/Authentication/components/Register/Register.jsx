import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // 👈 Import CSS
import { registerUser } from "../../../services/authService";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const isFormValid =
        formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.role.trim() !== "" &&
        formData.password.trim() !== "" &&
        Object.values(errors).every((error) => error === "");

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Live validation
        let errorMsg = "";

        switch (name) {
            case "name":
                if (!value.trim()) errorMsg = "Name is required";
                else if (value.length < 2)
                    errorMsg = "Name must be at least 2 characters";
                break;
            case "email":
                if (!value.trim()) errorMsg = "Email is required";
                else if (!/^\S+@\S+\.\S+$/.test(value))
                    errorMsg = "Email is invalid";
                break;
            case "phone":
                if (!value.trim()) errorMsg = "Phone number is required";
                else if (!/^\d{10}$/.test(value))
                    errorMsg = "Phone must be 10 digits";
                break;
            case "role":
                if (!value.trim()) errorMsg = "Role is required";
                break;
            case "password":
                if (!value.trim()) errorMsg = "Password is required";
                else if (value.length < 6)
                    errorMsg = "Password must be at least 6 characters";
                break;
            default:
                break;
        }

        // Update error for the field
        setErrors((prev) => ({
            ...prev,
            [name]: errorMsg,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // console.log(Object.keys(errors));
        if (
            Object.values(errors).every((msg) => msg === "") &&
            Object.values(formData).every((val) => val.trim() !== "")
        ) {
            try {
                // const response = await axios.post(
                //     "http://localhost:5000/api/auth/register",
                //     formData
                // );

                const res = await registerUser(formData);

                res.message && alert(res.message);

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    role: "",
                    password: "",
                });
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
                alert(
                    `❌ ${
                        error.response?.data?.message || "Registration failed"
                    }`
                );
            }
        }
    };

    const goToLogin = () => {
        navigate("/auth/login");
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="register-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="register-input"
                />
                {errors.name && <span className="error">{errors.name}</span>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="register-input"
                />
                {errors.email && <span className="error">{errors.email}</span>}
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="register-input"
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="register-input"
                >
                    <option value="">Select Role</option>{" "}
                    {/* default placeholder */}
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="content_developer">Content Developer</option>
                </select>
                {/* const rolesList = ["Content Developer", "Student", "Teacher",
                "Admin", "Block"]; */}
                {errors.name && <span className="error">{errors.role}</span>}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="register-input"
                />
                {errors.password && (
                    <span className="error">{errors.password}</span>
                )}
                <button
                    disabled={!isFormValid}
                    type="submit"
                    className="register-button"
                >
                    Register
                </button>
                <button
                    type="button"
                    onClick={goToLogin}
                    className="register-link-btn"
                >
                    Already have an account? Login
                </button>
            </form>
        </div>
    );
};

export default Register;
