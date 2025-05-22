const bcrypt = require("bcrypt");
const logger = require("../utils/logger");
const { getDB } = require("../config/db");

// 🔐 Replace with environment variable in production
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const db = getDB();
        const users = db.collection("users");

        const userList = await users
            .find({}, { projection: { password: 0 } }) // Exclude passwords
            .toArray();

        res.status(200).json({
            status: 200,
            message: "User list fetched successfully",
            data: userList,
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        logger.error("Get All Users Error", err);
        res.status(500).json({
            status: 500,
            message: "Failed to fetch users",
        });
    }
};
