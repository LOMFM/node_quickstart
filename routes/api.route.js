const express = require('express');
const router = express.Router();

// Import All Api Routes
const userRoute = require('./user.route');

// Match the basic routes
router.use('/user', userRoute);

module.exports = router;