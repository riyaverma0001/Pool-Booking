const express = require('express');
const adminController = require('../controllers/adminController')

const router = express.Router();

router.get('/adminSignup', adminController.getSignupPage)
router.post('/adminSignup', adminController.postSignupPage)

router.get('/adminLogin', adminController.getLoginPage);
router.post('/adminLogin', adminController.postLoginPage);
router.post('/adminLogout', adminController.logoutAdmin)

module.exports = router;  // Ensure this line exists