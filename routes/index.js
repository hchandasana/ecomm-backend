const express = require('express');
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const authMiddleware = require('../middlewares/authMiddleware');
const cartRoutes = require('./cartRoutes');
const paymentRoutes = require('./paymentRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', authMiddleware, productRoutes);
router.use('/cart', authMiddleware, cartRoutes);
router.use('/payment', authMiddleware, paymentRoutes);

module.exports = router;