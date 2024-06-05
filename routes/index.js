const express = require('express');
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const authMiddleware = require('../middlewares/authMiddleware');
const cartRoutes = require('./cartRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', authMiddleware, productRoutes);
router.use('/cart', authMiddleware, cartRoutes);

module.exports = router;