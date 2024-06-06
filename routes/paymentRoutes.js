const express = require('express');
const { createPayment, updatePaymentStatus } = require('../controllers/paymentController');

const router = express.Router();

router.post('/', createPayment);
router.put('/', updatePaymentStatus);

module.exports = router;