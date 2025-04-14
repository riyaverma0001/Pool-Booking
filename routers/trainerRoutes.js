const express = require('express');
const trainerController = require('../controllers/trainerController')

const router = express.Router();

router.get('/trainerSignup', trainerController.getSignupPage)
router.post('/trainerSignup', trainerController.postSignupPage)

router.get('/trainerLogin', trainerController.getLoginPage);
router.post('/trainerLogin', trainerController.postLoginPage);
router.post('/trainerLogout', trainerController.logoutTrainer)

module.exports = router;  // Ensure this line exists