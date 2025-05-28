const mongoose = require('mongoose');
// Order model for the e-commerce application
// This model defines the structure of an order in the database

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', required: true
        },
        quantity: {
            type: Number,
            required: true
        },
    }],
    orderValue: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Delayed', 'Confirmed', 'Out for delivery', 'Returned'],
        default: 'Delayed'
    },
    expectedDelivery: {
        type: Date,
        required: true
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;