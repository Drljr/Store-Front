const express = require('express');
const router = express.Router();
const { supplierController } = require('../controllers/supplierController');

// Get all suppliers (for Suppliers page)
router.get('/', supplierController.getAllSuppliers);

// Create a new supplier
router.post('/', supplierController.createSupplier);

// Update a supplier
router.put('/:id', supplierController.updateSupplier);

// Delete a supplier
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;