const Supplier = require('../models/SupplierModel');

const supplierController = {
    getAllSuppliers: async (req, res) => {
        try {
            const suppliers = await Supplier.find();
            res.status(200).json(suppliers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createSupplier: async (req, res) => {
        try {
            const data = req.body;
            const supplier = new Supplier(data);
            await supplier.save();
            res.status(201).json(supplier);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    updateSupplier: async (req, res) => {
        try {
            const { name, category, rating, status, location, phone, email, totalOrders, onTimeDelivery, qualityScore, totalValue } = req.body;
            if (!name || !category || !rating || !status || !location || !phone || !email || !totalOrders || !onTimeDelivery || !qualityScore || !totalValue) {
                return res.status(400).json({ message: 'All required fields must be provided for update.' });
            }
            const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
            res.status(200).json(supplier);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteSupplier: async (req, res) => {
        try {
            await Supplier.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Supplier deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = { supplierController };