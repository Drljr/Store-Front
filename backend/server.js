const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const UserRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleWare");

dotenv.config({ path: './config.env' });
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://manLikeDesy:KwFKFJIZKjAu6Lfv@cluster0.rdkifef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

const app = express();

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes Middleware
app.use("/api/user", UserRoute);

//routes
app.get('/', (req, res) => {
    res.send("Home page");
});

//error middleware
app.use(errorHandler);

//port
const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});