const axios = require("axios");

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

exports.verifyCaptcha = async (req, res, next) => {
    const { token } = req.body;

    if (!token)
        return res.status(400).json({ message: "CAPTCHA token missing" });

    try {
        const response = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            new URLSearchParams({
              secret: RECAPTCHA_SECRET_KEY,
              response: token,
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          

        next();
    } catch (err) {
        console.error("CAPTCHA error:", err);
        res.status(500).json({ message: "CAPTCHA verification failed" });
    }
};
