const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    //validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill all required fields")
    }
    if (password.length < 6) {
        res.status(400)
        throw new Error("Password must be up to 8 characters")
    }
    //check if user exists
    let userExists;
    try {
        userExists = await User.findOne({ email }).maxTimeMS(20000);
        // Handle userExist
    } catch (error) {
        if (error instanceof Error) {
            console.error('Mongoose error:', error);
            // Handle Mongoose error
        } else {
            console.error('Other error:', error);
            // Handle other errors
        }
    }


    if (userExists) {
        res.status(400)
        throw new Error("Email has already been registered")
    }

    //create new user
    const user = await User.create({
        name,
        email,
        password,
    })

    //generate token
    const token = generateToken(_id)

    if (user) {
        const { _id, name, email } = User
        res.status(201).json({
            _id, name, email, token,
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
});

module.exports = {
    registerUser,
};