import React, { Children, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Sidebar from "../adminDashboard/Sidebar";
import styles from "../adminDashboard/AdminDashboard.module.css";
import BootstrapModal from "../../../shared/BootstrapModal";
import EditUser from "./EditUser";
import { toast } from "react-toastify";

const UsersList = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // to store the selected user
    const [selectUserToDelete, setSelectUserToDelete] = useState(null);

    const dispatch = useDispatch();

    // ✅ Global state for sidebar visibility
    const sidebarVisible = useSelector((state) => state.sidebar.sidebarVisible);

    const openModal = (user) => {
        setSelectedUser(user); // Store the selected user
        setShowModal(true);
    };
    const openModalDelete = (user) => {
        setSelectUserToDelete(user._id); // Store the selected user
        setShowModalDelete(true);
    };

    const closeModal = () => setShowModal(false);
    const closeModalDelete = () => setShowModalDelete(false);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const res = await axios.get(
    //                 "http://localhost:5000/api/users/userlist"
    //             );
    //             setUsers(res.data);
    //         } catch (err) {
    //             console.error("Error fetching users", err);
    //         }
    //     };
    //     fetchUsers();
    // }, [showModal, showModalDelete]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/users/userlist"
                );
                setUsers(res.data);
            } catch (err) {
                console.error("Error fetching users", err);
            }
        };

        // Only fetch when BOTH modals are false (closed)
        if (!showModal && !showModalDelete) {
            fetchUsers();
        }
    }, [showModal, showModalDelete]);

    const handleDeleteConfirm = async () => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/auth/user/${selectUserToDelete}`
            );
            if (res.data.status == "success") {
                setUsers(users.filter((u) => u._id !== selectUserToDelete));
                setShowModalDelete(false);
                toast.success("User Deleted successfully");
            }
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <div className="container-fluid px-0">
            {/* Sidebar */}
            <div
                className={`${styles.sidebar} ${
                    !sidebarVisible ? styles.sidebarHidden : ""
                } d-md-block`}
            >
                <Sidebar visible={sidebarVisible} />
            </div>

            {/* Edit user */}
            <BootstrapModal
                show={showModal}
                handleClose={closeModal}
                title="Edit User"
            >
                {selectedUser && (
                    <EditUser
                        handleClose={closeModal}
                        id={selectedUser._id}
                        name={selectedUser.name}
                        email={selectedUser.email}
                        phone={selectedUser.phone}
                        role={selectedUser.role}
                        onChange={(updatedUser) => setSelectedUser(updatedUser)} // To update the user in state after editing
                    />
                )}
            </BootstrapModal>

            {/* Delete user */}
            <BootstrapModal
                show={showModalDelete}
                handleClose={closeModalDelete}
                title="Delete User"
            >
                <p className="fs-5">
                    Are you sure you want to delete this user?
                </p>
                <div className="d-flex justify-content-end gap-2 mt-4">
                    <button
                        className="btn btn-secondary"
                        onClick={closeModalDelete}
                    >
                        No
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={handleDeleteConfirm}
                    >
                        Yes
                    </button>
                </div>
            </BootstrapModal>

            {/* Main content */}
            <div
                className="content p-4"
                style={{
                    marginLeft: sidebarVisible ? 250 : 0,
                    transition: "margin-left 0.3s ease-in-out",
                }}
            >
                <h2 className="mb-4">All Users</h2>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>S.No</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th style={{ minWidth: "150px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone || "N/A"}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-info mr-2"
                                                onClick={() => {
                                                    openModal(user);
                                                }}
                                            >
                                                {" "}
                                                Edit
                                            </button>
                                            {"\u00A0"}{" "}
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => {
                                                    openModalDelete(user);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersList;
