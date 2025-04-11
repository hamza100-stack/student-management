// routes/auth.js
const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {

    console.log(req.body);
    const { name, email, phone, password } = req.body;

    // Basic validation
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // You can later add DB logic here
    console.log("📥 Registration Data:", req.body);

    return res.status(200).json({
        message: "User registered successfully",
        user: { name, email, phone },
    });
});

module.exports = router;
