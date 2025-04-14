const express = require('express');
const poolController = require('../controllers/poolController');

const router = express.Router();
router.get('/add-pool', poolController.getAddPoolPage)
router.post('/add-pool', poolController.postAddPool)
router.get('/details/:id', poolController.getFullDetails)

module.exports = router;  // Ensure this line exists