const express = require('express');
const { addToShipment, updateShipmentStatus } = require('../controllers/shipmentController');

const router = express.Router();

router.post('/', addToShipment);
router.put('/', updateShipmentStatus);

module.exports = router;