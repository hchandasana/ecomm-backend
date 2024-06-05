const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    collection: "Products",
    timestamps: true,
});

module.exports = mongoose.model('Product', ProductSchema);