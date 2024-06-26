const mongoose = require('mongoose');

const CartDetailSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, {
    collection: "CartDetails",
    timestamps: true,
});

module.exports = mongoose.model('CartDetail', CartDetailSchema);