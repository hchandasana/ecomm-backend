const express = require('express');
const { addOrUpdateCart, getCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/', addOrUpdateCart);
router.get('/', getCart);

module.exports = router;