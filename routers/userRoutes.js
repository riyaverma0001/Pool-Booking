const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();

router.get('/signup', userController.getSignupPage)
router.post('/signup', userController.postSignupPage)

router.get('/login', userController.getLoginPage);
router.post('/login', userController.postLoginPage);
router.post('/userLogout', userController.logoutUser)

module.exports = router;  // Ensure this line exists