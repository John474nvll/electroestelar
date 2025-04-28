const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.put('/update-status', paymentController.updatePaymentStatus);

module.exports = router;