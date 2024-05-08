const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all required fields");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters");
    }

    // Check if user exists
    let userExists;
    try {
        userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("Email has already been registered");
        }
    } catch (error) {
        console.error('Mongoose error:', error);
        res.status(500);
        throw new Error("Internal Server Error");
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    });

    // Generate token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1day
        sameSite: "none",
        secure: true,
    });

    // Respond with user data and token
    if (user) {
        const { _id, name, email } = user;
        res.status(201).json({
            _id, name, email, token,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// LOgin User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    // Validate request
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill email and password");
    }

    //Check if user exist
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error("User not found, please signUp");
    }

    // User exist, check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    // Generate Token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1day
        sameSite: "none",
        secure: true,
    });

    if (user && passwordIsCorrect) {
        const { _id, name, email } = user;
        res.status(200).json({
            _id, name, email,
        });
    } else {
        res.status(400);
        throw new Error("invalid email or password");
    }

});

// Logout User
const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({message: "logged out Successfully"})
})

module.exports = {
    registerUser,
    loginUser,
    logout
};
