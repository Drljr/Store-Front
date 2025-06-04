const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        unique: true,
        required: true
    },
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
        enum: ['all', 'Electronics', 'Clothings', 'Furniture', 'Lifestyle', 'Sports', 'Books'],
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
    supplier: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

ProductSchema.pre('save', async function (next) {
    if (!this.productId) {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
        const count = (await this.constructor.countDocuments({ productId: new RegExp(`^PROD-${date}-`) })) + 1;
        this.productId = `PROD-${date}-${String(count).padStart(3, '0')}`;
    }
    next();
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;