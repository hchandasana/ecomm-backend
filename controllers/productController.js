const Product = require('../models/Product');

module.exports = {
    getAllProducts: async (_, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    searchProducts: async (req, res) => {
        try {
            const { query } = req.query;
            const products = await Product.find({ name: { $regex: query, $options: 'i' } });
            res.json(products);
        } catch (err) {
            console.log('err', err);
            res.status(500).json({ message: err.message });
        }
    }
};