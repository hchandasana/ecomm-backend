const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    address: {
        type: String,
        required: true
    }
}, {
    collection: "Shipments",
    timestamps: true,
});

module.exports = mongoose.model('Shipment', ShipmentSchema);