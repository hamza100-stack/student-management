const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        res.status(500).json({ message: "Server error", err });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

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
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.log(" backend login error :", error);
        return res.status(500).json({ message: "Server error" });
    }
};
