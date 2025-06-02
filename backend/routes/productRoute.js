const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});

// Get all products
router.get('/', productController.getAllProducts);

// Create a new product
router.post('/create', productController.createProduct);

// Get a product by ID
router.get('/:id', productController.getProductById, (req, res) => {
    res.json(res.product);
});

// Update a product by ID
router.put('/:id', productController.getProductById, productController.updateProduct);

// Delete a product by ID
router.delete('/:id', productController.getProductById, productController.deleteProduct);

module.exports = router;
