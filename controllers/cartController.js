const Cart = require('../models/Cart');
const CartDetail = require('../models/CartDetail');
const Product = require('../models/Product');

module.exports = {
    addOrUpdateCart: async (req, res) => {
        try {
            const { id: userId } = req.user;
            const { productId, quantity } = req.body;

            let cart = await Cart.findOne({ userId, status: 'active' });
            if (!cart) {
                cart = new Cart({ userId });
                await cart.save();
            }

            const product = await Product.findById(productId);
            await CartDetail.findOneAndUpdate(
                { cartId: cart._id, productId },
                { $set: { quantity, price: product.price } },
                { new: true, upsert: true }
            );

            res.status(200).json({ message: 'Product updated successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getCart: async (req, res) => {
        try {
            const { id: userId } = req.user;
            const cart = await Cart.findOne({ userId, status: 'active' });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            const cartDetails = await CartDetail
                .find({ cartId: cart._id, quantity: { $gt: 0 } })
                .populate('productId')
                .sort({ createdAt: -1 });
            res.status(200).json(cartDetails);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};