const Shipment = require('../models/Shipment');
const ShipmentDetail = require('../models/ShipmentDetails');

module.exports = {
    addToShipment: async (req, res) => {
        try {
            const { id: userId } = req.user;
            const { cartId, address, billingAddress, products } = req.body;

            const shipment = new Shipment({
                userId, cartId,
                address, billingAddress
            });

            await shipment.save();

            const shipmentDetails = products.map(({ productId, quantity }) => ({
                shipmentId: shipment._id,
                productId: productId._id, quantity,
            }));

            await ShipmentDetail.insertMany(shipmentDetails);

            res.status(200).json({
                shipmentId: shipment._id,
                message: 'Shipment added successfully'
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updateShipmentStatus: async (req, res) => {
        try {
            const { id: userId } = req.user;
            const { shipmentId, status } = req.body;
            await Shipment.updateOne({ _id: shipmentId, userId }, { $set: { status } });

            await ShipmentDetail.updateMany({ shipmentId }, { $set: { status } });

            res.status(200).json({ message: 'Shipment status updated successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}