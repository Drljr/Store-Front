const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please input a name"],
    },
    email: {
        type: String,
        required: [true, "Please input email"],
    },
    password: {
        type: String,
        required: [true, "Please input password"],
        minLength: [8, "Password must be at least 8 characters"],
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;