const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const captchaMiddleware = require("../middlewares/captcha.middleware");

router.post("/register", authController.register);
router.post("/login", captchaMiddleware.verifyCaptcha, authController.login);
router.put("/user/:id", authController.updateUser);
router.delete("/user/:id", authController.deleteUser);

module.exports = router;
