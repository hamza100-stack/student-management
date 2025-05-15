import React, { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { rolesMap } from "../../../utilities/roleList";
import { rolesList } from "../../../utilities/roleList";

const EditUser = ({ id, name, email, phone, role, onChange, handleClose }) => {
    const [formName, setFormName] = useState(name);
    const [formEmail, setFormEmail] = useState(email);
    const [formPhone, setFormPhone] = useState(phone);
    const [formRole, setFormRole] = useState(role);
    const [error, setError] = useState({
        name: "",
        phone: "",
        role: "",
    });

    const handleNameChange = (e) => {
        let value = e.target.value;

        // Remove anything that is not a letter or space
        value = value.replace(/[^a-zA-Z\s]/g, "");

        // Limit name length (optional, say 30)
        if (value.length > 30) {
            value = value.slice(0, 30);
        }

        setFormName(value);

        if (value.trim() === "") {
            setError((prev) => ({ ...prev, name: "Name is required" }));
        } else if (value.length < 3) {
            setError((prev) => ({
                ...prev,
                name: "Name must be at least 3 characters",
            }));
        } else {
            setError((prev) => ({ ...prev, name: "" }));
        }
    };

    const handleEmailChange = (e) => {
        setFormEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const regex = /^[0-9]*$/; // Only digits

        setFormPhone(value); // Always update the input field

        if (value === "") {
            setError((prev) => ({
                ...prev,
                phone: "Phone number is required",
            }));
        } else if (!regex.test(value)) {
            setError((prev) => ({ ...prev, phone: "Only digits allowed" }));
        } else if (value.length !== 10) {
            setError((prev) => ({
                ...prev,
                phone: "Phone number must be 10 digits",
            }));
        } else {
            setError((prev) => ({ ...prev, phone: "" })); // Clear error
        }
    };

    const handleRoleChange = (e, r) => {
        setError((prev) => ({ ...prev, role: "" })); // Clear error

        const value = e.target.value;

        setFormRole(r);

        if (r == undefined) {
            setError((prev) => ({
                ...prev,
                role: "Value is required",
            }));
        } else {
            setError((prev) => ({
                ...prev,
                role: "",
            }));
        }
    };
    const handleSubmit = async (e) => {
        const value = e.target.preventDefault;

        if (formRole == undefined) {
            setError((prev) => ({
                ...prev,
                role: "Value is required",
            }));
        } else {
            setError((prev) => ({
                ...prev,
                role: "",
            }));
        }

        if (
            error.name !== "" &&
            error.phone !== "" &&
            error.role !== undefined &&
            error.role !== null &&
            error.role != ""
        ) {
            return;
        } else {
            const user = {
                name: formName,
                phone: formPhone,
                role: formRole,
            };
            try {
                const res = await axios.put(
                    `http://localhost:5000/api/auth/user/${id}`,
                    user
                );

                if (res.data.status == "success") {
                    toast.success("User updated successfully");
                    handleClose();
                }
            } catch (err) {
                let data = err.response.data;
                if (data.status == 404 && data.message) {
                    return toast.error(data.message);
                }
            }
        }
    };

    return (
        <>
            <form>
                <div className="form-group mb-3">
                    <label>ID (readonly)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={id}
                        readOnly
                    />
                </div>

                <div className="form-group mb-3">
                    <label>Name</label>
                    <input
                        maxLength={30}
                        type="text"
                        className="form-control"
                        value={formName}
                        onChange={handleNameChange}
                    />
                    <div className="text-danger">{error.name}</div>
                </div>

                <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                        readOnly
                        type="email"
                        className="form-control"
                        value={formEmail}
                        onChange={handleEmailChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label>Phone</label>
                    <input
                        maxLength={10}
                        type="text"
                        className="form-control"
                        value={formPhone}
                        onChange={handlePhoneChange}
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault(); // blocks any non-digit key
                            }
                        }}
                        onPaste={(e) => {
                            const paste = e.clipboardData.getData("text");
                            if (!/^[0-9]+$/.test(paste)) {
                                e.preventDefault(); // blocks pasting invalid content
                            }
                        }}
                    />
                    <div className="text-danger">{error.phone}</div>
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <div className="d-flex flex-wrap">
                        {rolesList.map((r) => {
                            const mappedValue = rolesMap[r];

                            return (
                                <div className="form-check me-3" key={r}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id={r}
                                        name="role"
                                        value={r}
                                        checked={formRole === mappedValue}
                                        onChange={(e) => {
                                            handleRoleChange(e, mappedValue);
                                        }}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={r}
                                    >
                                        {r}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <div className="text-danger">{error?.role}</div>
                </div>
            </form>

            <div className="d-flex justify-content-end mt-3">
                <button onClick={handleSubmit} className="btn btn-primary">
                    Update
                </button>
            </div>
        </>
    );
};

export default EditUser;
