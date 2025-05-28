const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    manager: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;