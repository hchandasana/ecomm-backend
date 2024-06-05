const express = require('express');
const { getAllProducts, searchProducts } = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/search', searchProducts);

module.exports = router;