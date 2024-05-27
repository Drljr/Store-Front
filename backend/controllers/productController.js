const Product = require('../models/ProductModel');

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.product = product;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, buyingPrice, quantity, thresholdValue, expiryDate, availability } = req.body;
        if (name) res.product.name = name;
        if (buyingPrice) res.product.buyingPrice = buyingPrice;
        if (quantity) res.product.quantity = quantity;
        if (thresholdValue) res.product.thresholdValue = thresholdValue;
        if (expiryDate) res.product.expiryDate = expiryDate;
        if (availability !== undefined) res.product.availability = availability;
        await res.product.save();
        res.json(res.product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
