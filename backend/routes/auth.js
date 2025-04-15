// routes/auth.js
const express = require("express");
const router = express.Router();
const axios = require("axios");


require("dotenv").config();
// const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_SECRET_KEY = "6LdmIBkrAAAAAMw1hY6RYwoPdxdpU7GZiOfufSvK"

console.log(RECAPTCHA_SECRET_KEY, 'captcha');


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




// Example POST route for login
router.post("/login", async (req, res) => {

 
    const { username, password, token } = req.body;



    if (!token) {
        return res.status(400).json({ message: "CAPTCHA token missing" });
    }

    try {
        // Verify CAPTCHA with Google
        const googleRes = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
        );

        if (!googleRes.data.success) {
            return res
                .status(403)
                .json({ message: "CAPTCHA verification failed" });
        }

        // ✅ CAPTCHA passed, now proceed with your login logic
        if (username === "admin" && password === "admin123") {
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.error("CAPTCHA verification error:", err);
        res.status(500).json({ message: "Server error verifying CAPTCHA" });
    }
});



module.exports = router;
