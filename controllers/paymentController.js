const Payment = require('../models/Payment');
const QRCode = require('qrcode');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    createPayment: async (req, res) => {
        try {
            const { id: userId, username } = req.user;
            const { cartId, amount, paymentMethod } = req.body;

            const payment = new Payment({
                userId, cartId,
                amount, paymentMethod
            });
            await payment.save();

            const qrData = `upi://pay?pa=${process.env.UPI_ID}&pn=${username}&am=${amount}&tn=Payment%20for%20Order%20${payment._id}&cu=INR&tid=${payment._id}`;
            const qrCodeURL = await QRCode.toDataURL(qrData);

            res.status(200).json({ qrCodeURL, paymentId: payment._id });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updatePaymentStatus: async (req, res) => {
        try {
            const { id: userId } = req.user;
            const { paymentId, status } = req.body;

            await Payment.updateOne({ _id: paymentId, userId }, { $set: { status } });

            res.status(200).json({ message: 'Payment status updated successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};