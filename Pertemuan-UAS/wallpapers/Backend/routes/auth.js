const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../middleware/upload");

// Register
router.post("/register", upload.single("photo"), authController.register);

// Login
router.post("/login", authController.login);

// Logout
router.post("/logout", authController.logout);

// Get current user
const verifyToken = require("../middleware/verifyToken"); // kalau sudah buat
router.get("/me", verifyToken, authController.getMe);

module.exports = router;
