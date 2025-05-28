const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', required: true
    },
    quantitySold: {
        type: Number,
        required: true
    },
    totalRevenue: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;