const express = require('express');
const router = express.Router();
const { orderController } = require('../controllers/orderController');

// Get all orders (for Orders page and Order Summary)
router.get('/', orderController.getAllOrders);

// Get purchase overview (for Purchase Overview)
router.get('/purchase-overview', orderController.getPurchaseOverview);

// Create a new order
router.post('/create', orderController.createOrder);

// Update an order
router.put('/:id', orderController.updateOrder);

// Delete an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;