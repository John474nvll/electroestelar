const express = require('express');
const router = express.Router();
const nequiController = require('../controllers/nequiController');

router.post('/start', nequiController.startNequiPayment);

module.exports = router;