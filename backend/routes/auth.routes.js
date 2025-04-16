const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const captchaMiddleware = require("../middlewares/captcha.middleware");

router.post("/register", authController.register);
router.post("/login", captchaMiddleware.verifyCaptcha, authController.login);

module.exports = router;
