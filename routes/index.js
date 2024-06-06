const express = require('express');
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const authMiddleware = require('../middlewares/authMiddleware');
const cartRoutes = require('./cartRoutes');
const paymentRoutes = require('./paymentRoutes');
const shipmentRoutes = require('./shipmentRoute');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', authMiddleware, productRoutes);
router.use('/cart', authMiddleware, cartRoutes);
router.use('/payment', authMiddleware, paymentRoutes);
router.use('/shipment', authMiddleware, shipmentRoutes);

module.exports = router;