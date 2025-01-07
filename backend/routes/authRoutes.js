const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Register and Login Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Profile Route (Protected)
router.get('/profile', authMiddleware, authController.getUserProfile);

module.exports = router;
