const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    buyingPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    thresholdValue: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
