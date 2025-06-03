const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['all', 'Electronics', 'Clothings', 'Furniture', 'Lifestyle', 'Sports', 'Books'],
        default: 'all'
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    status: {
        type: String,
        enum: ['Active', 'Pending', 'Inactive'],
        default: 'Active'
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    totalOrders: {
        type: Number,
        required: true
    },
    onTimeDelivery: {
        type: Number,
        required: true
    },
    qualityScore: {
        type: Number,
        required: true
    },
    totalValue: {
        type: Number,
        required: true
    },
    lastOrder: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;