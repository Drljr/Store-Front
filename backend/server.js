const express = require('express');
const logger = require("morgan")
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRoute = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute")
const errorHandler = require("./middleWare/errorMiddleWare");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config({ path: './config.env' });

const uri = process.env.MONGO_URI;
const app = express();

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(logger('dev'))

//error middleware
app.use(errorHandler);


//Routes Middleware
app.use("/api/user", UserRoute);
app.use("/products", productRoutes);

//routes
app.get('/', (_, res) => {
    res.send("Home page").status(200);
});

//port
const PORT = process.env.BACKEND_PORT || 5000;

app.listen(PORT, () => {
    mongoose.connect(uri).then(() => {
        console.log("Database connected")
    })

    console.log(`Server is running on port ${PORT}`);
});
