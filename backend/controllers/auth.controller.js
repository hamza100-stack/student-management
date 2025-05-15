const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const isDbConnected = require("../utils/dbStatus");

const { getDB } = require("../config/db");
const JWT_SECRET = process.env.JWT_SECRET; // 🔐 Replace with an env variable in production

exports.register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password)
        return res.status(400).json({ message: "All fields are required" });

    try {
        const db = getDB();
        const users = db.collection("users");

        const existingUser = await users.findOne({ email });
        if (existingUser)
            return res.status(409).json({ message: "User already exists" });
        // 🔐 Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await users.insertOne({ name, email, phone, password: hashedPassword });
        return res.status(200).json({
            message: "User registered successfully",
            user: {
                name: name,
                email: email,
                phone: phone,
            },
        });
    } catch (err) {
        console.error("Registration error:", err);
        logger.error("Login Error", err); // 👈 Log full error to file
        res.status(500).json({ message: "Server error", err });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!(await isDbConnected())) {
        logger.error("Login failed: Database is disconnected");

        return res
            .status(500)
            .json({ message: "Database not connected, please try again." });
    }

    try {
        const db = getDB();
        const users = db.collection("users");

        const user = await users.findOne({ email: username }); // assuming username = email

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // ✅ Create JWT Token
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                JWT_SECRET,
                { expiresIn: "60m" } // optional: set token expiry
            );

            return res.status(200).json({
                message: "Login successful",
                token, // 🔑 send token to frontend
                user: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                },
            });
        } else {
            logger.error("Login Error", "Invalid password"); // 👈 Log full error to file
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.log(" backend login error :", error);
        logger.error("Login Error", error); // 👈 Log full error to file
        return res.status(500).json({ message: "Server error" });
    }
};

// update user
const { ObjectId } = require("mongodb");

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, phone, role } = req.body;

    if (!name || !phone || !role)
        return res.status(400).json({ message: "All fields are required" });

    try {
        const db = getDB();
        const users = db.collection("users");

        const result = await users.updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, phone, role } }
        );

        if (result.modifiedCount === 0) {
            console.log("one");
            return res
                .status(404)
                .json({ status: 404, message: "Please update user." });
        }

        return res.status(200).json({
            status: "success",
            message: "User updated successfully",
        });
    } catch (error) {
        console.error("Update error:", error);
        logger.error("Update Error", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// delete user

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id, "id");
        const db = getDB();
        const users = db.collection("users");

        const result = await users.deleteOne({
            _id: new ObjectId(id),
        });

        if (result.deletedCount === 0)
            return res.status(404).json({ message: "User not found" });

        return res
            .status(200)
            .json({ status: "success", message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        logger.error("Delete Error", error);
        return res.status(500).json({ message: "Server error" });
    }
};
