const express = require('express');
const authController = require('../controllers/authController');
const registerController = require('../controllers/registerController');

const router = express.Router();

// Define authentication routes
router.post('/login', authController.login);
router.post('/register', registerController.register);

module.exports = router;
