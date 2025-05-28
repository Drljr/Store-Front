const Sale = require('../models/salesModel');

const saleController = {
    getSalesOverview: async (req, res) => {
        try {
            const sales = await Sale.find().populate('productId');
            res.status(200).json(sales);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getTopSellingProducts: async (req, res) => {
        try {
            const topSelling = await Sale.aggregate([
                { $group: { _id: '$productId', totalSold: { $sum: '$quantitySold' } } },
                { $sort: { totalSold: -1 } },
                { $limit: 5 },
                { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
                { $unwind: '$product' },
            ]);
            res.status(200).json(topSelling);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createSale: async (req, res) => {
        try {
            const sale = new Sale(req.body);
            await sale.save();
            res.status(201).json(sale);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    updateSale: async (req, res) => {
        try {
            const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(sale);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteSale: async (req, res) => {
        try {
            await Sale.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Sale deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = { saleController };