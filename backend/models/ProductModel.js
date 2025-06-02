const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['all', 'Electronics', 'Furniture', 'Lifestyle', 'Sports', 'Books'],
        default: 'all'
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    minStock: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['In Stock', 'Out of Stock'],
        default: 'In Stock'
    },
    supplier: { // Added supplier field
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: true
    },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;