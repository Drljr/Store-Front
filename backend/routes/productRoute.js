const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');



// Create a new product with image upload handled by multer
router.post('/', upload.single('image'), productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get a product by ID
router.get('/:id', productController.getProductById, (req, res) => res.json(res.product));

// Update a product by ID
router.put('/:id', productController.getProductById, productController.updateProduct);

// Delete a product by ID
router.delete('/:id', productController.getProductById, productController.deleteProduct);

module.exports = router;
