import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./AdminDashboard.module.css";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
    const sidebarVisible = useSelector((state) => state.sidebar.sidebarVisible);

    return (
        <>
            <Sidebar visible={sidebarVisible} />
            <div className="container-fluid px-0">
                {/* Main Content */}
                <div
                    className="content p-4"
                    style={{
                        marginLeft: sidebarVisible ? 250 : 0,
                        transition: "margin-left 0.3s ease-in-out",
                    }}
                >
                    {/* Stats Row */}
                    <div className="row mb-4">
                        <div className="col-md-3">
                            <div className="card text-white bg-primary">
                                <div className="card-body">
                                    <h5 className="card-title">Total Users</h5>
                                    <p className="card-text">1,024</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-white bg-success">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Total Courses
                                    </h5>
                                    <p className="card-text">42</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-white bg-warning">
                                <div className="card-body">
                                    <h5 className="card-title">Orders</h5>
                                    <p className="card-text">312</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-white bg-danger">
                                <div className="card-body">
                                    <h5 className="card-title">Reports</h5>
                                    <p className="card-text">58</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Admin Controls */}
                    <div id="add-course" className="card mb-4">
                        <div className="card-header">Manage Courses</div>
                        <div className="card-body">
                            <button className="btn btn-outline-primary mr-2">
                                Add New Course
                            </button>
                            <button className="btn btn-outline-danger">
                                Remove Course
                            </button>
                        </div>
                    </div>

                    <div id="view-reports" className="card">
                        <div className="card-header">Reports</div>
                        <div className="card-body">
                            <p>
                                Click below to generate or view detailed
                                reports.
                            </p>
                            <button className="btn btn-outline-dark">
                                View Reports
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
