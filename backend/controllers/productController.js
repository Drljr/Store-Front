const Product = require('../models/ProductModel');

exports.createProduct = async (req, res, next) => {
    try {
        const {
            name,
            productId,
            category,
            buyingPrice,
            quantity,
            unit,
            expiryDate,
            thresholdValue,
            availability,
        } = req.body;

        // Validate required fields if needed
        if (!name || !buyingPrice || !quantity || !thresholdValue || !expiryDate || !availability) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
    }

        const product = new Product({
            name,
            productId,
            category,
            buyingPrice: buyingPrice ? Number(buyingPrice) : undefined,
            quantity: quantity ? Number(quantity) : undefined,
            unit,
            expiryDate,
            thresholdValue: thresholdValue ? Number(thresholdValue) : undefined,
            availability: availability === 'true' || availability === true,
            imagePath: image ? image.path : undefined, // save the image path or URL in your DB
        });

        await product.save();

        res.status(201).json(savedProduct);

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
