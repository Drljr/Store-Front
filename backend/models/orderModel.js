const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true,
        default: () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    },
    customer: {
        type: String,
        required: true,
    },
    items: {
        type: Number,
        required: true,
        min: 1
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['Delivered', 'Pending', 'Processing', 'Shipped'],
        default: 'Pending'
    },
    date: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;