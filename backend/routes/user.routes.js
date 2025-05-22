const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/userlist", userController.getAllUsers);

module.exports = router;
