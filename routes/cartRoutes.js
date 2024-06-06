const express = require('express');
const { addOrUpdateCart, getCart, updateCartStatus } = require('../controllers/cartController');

const router = express.Router();

router.post('/', addOrUpdateCart);
router.get('/', getCart);
router.put('/', updateCartStatus);

module.exports = router;