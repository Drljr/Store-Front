const Supplier = require('../models/SupplierModel');
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Or configure diskStorage

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
            const image = req.file; // Optional: save path or filename in DB
            const supplier = new Supplier(req.body);
            await supplier.save();
            res.status(201).json(supplier);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    updateSupplier: async (req, res) => {
        try {
            const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
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