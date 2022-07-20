const express = require('express');
const authRoute = express.Router();
const authController = require('../controllers/auth');

authRoute.post('/signup', authController.signup);
authRoute.post('/signin', authController.signin);

module.exports = authRoute;
