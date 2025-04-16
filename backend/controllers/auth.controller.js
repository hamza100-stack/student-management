const { getDB } = require("../config/db");

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

        await users.insertOne({ name, email, phone, password });
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Server error" });
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

        if (user.password === password) {
            return res.status(200).json({
                message: "Login successful",
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

