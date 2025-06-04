const express = require('express');
const router = express.Router();
const { saleController } = require('../controllers/salesController');

// Get sales overview (for Sales Overview and Profit & Revenue)
router.get('/', saleController.getSalesOverview);

// Get top selling products (for Top Selling Stock)
router.get('/top-selling', saleController.getTopSellingProducts);

// Create a new sale
router.post('/', saleController.createSale);

// Update a sale
router.put('/:id', saleController.updateSale);

// Delete a sale
router.delete('/:id', saleController.deleteSale);

module.exports = router;