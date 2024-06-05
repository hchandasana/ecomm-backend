const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'active'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    collection: "Carts",
    timestamps: true,
});

module.exports = mongoose.model('Cart', CartSchema);