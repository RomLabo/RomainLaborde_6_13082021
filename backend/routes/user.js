const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const validPassword = require('../middleware/password-config');
const rateLimiter = require('../middleware/rate-limiter');


router.post('/signup', validPassword, userController.signup);
router.post('/login', rateLimiter, userController.login);

module.exports = router;