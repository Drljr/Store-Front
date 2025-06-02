const Product = require('../models/ProductModel');

exports.createProduct = async (req, res, next) => {
    try {
        const {
            name,
            sku,
            category,
            price,
            stock,
            minStock,
            status,
            supplier,
            lastUpdated
        } = req.body;

        // Validate all required fields
        if (!name || !productId || !sku || !price || !stock || !minStock || !status || !supplier || !lastUpdated) {
            return res.status(400).json({ error: 'Please provide all required fields: name, productId, sku, price, stock, minStock, status, supplier, lastUpdated.' });
        }

        const product = new Product({
            name,
            sku,
            category,
            price: Number(price),
            stock: Number(stock),
            minStock: Number(minStock),
            status,
            supplier,
            lastUpdated: lastUpdated ? new Date(lastUpdated) : new Date(),
        });

        await product.save();

        res.status(201).json(product);
    } catch (error) {
        next(error);
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
        const { name, sku, category, price, stock, minStock, status, lastUpdated } = req.body;
        if (name) res.product.name = name;
        if (sku) res.product.sku = sku;
        if (category) res.product.category = category;
        if (price) res.product.price = Number(price);
        if (stock) res.product.stock = Number(stock);
        if (minStock) res.product.minStock = Number(minStock);
        if (status) res.product.status = status;
        if (lastUpdated) res.product.lastUpdated = new Date(lastUpdated);
        await res.product.save();
        res.json(res.product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await res.product.deleteOne(); // Updated from remove() to deleteOne() for Mongoose 7+
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};