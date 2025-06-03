const Order = require('../models/orderModel');

const orderController = {
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getPurchaseOverview: async (req, res) => {
        try {
            const orders = await Order.find({ status: { $in: ['Shipped', 'Delivered', 'Pending', 'Processing'] } });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createOrder: async (req, res) => {
        try {
            const { customer, items, total, status, priority, paymentStatus, date } = req.body;
            const orderData = {
                customer,
                items: Number(items),
                total: Number(total),
                status: status || 'Pending',
                priority: priority || 'low',
                paymentStatus: paymentStatus || 'unpaid',
                date: date ? new Date(date) : Date.now(),
            };
            const order = new Order(orderData);
            await order.save();
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    updateOrder: async (req, res) => {
        try {
            const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteOrder: async (req, res) => {
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Order deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
module.exports = { orderController };