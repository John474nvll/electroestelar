const express = require('express');
const router = express.Router();
const pseController = require('../controllers/pseController');

router.post('/start', pseController.startPsePayment);

module.exports = router;