
const Store = require('../models/storeModel');

const storeController = {
    getAllStores: async (req, res) => {
        try {
            const stores = await Store.find();
            res.status(200).json(stores);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createStore: async (req, res) => {
        try {
            const store = new Store(req.body);
            await store.save();
            res.status(201).json(store);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    updateStore: async (req, res) => {
        try {
            const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(store);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteStore: async (req, res) => {
        try {
            await Store.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Store deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
module.exports = { storeController };