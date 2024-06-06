const mongoose = require('mongoose');

const ShipmentDetailSchema = new mongoose.Schema({
    shipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipment',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
}, {
    collection: "ShipmentDetails",
    timestamps: true,
});

module.exports = mongoose.model('ShipmentDetail', ShipmentDetailSchema);