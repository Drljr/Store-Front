const express = require('express');
const dotenv = require('dotenv');
const UserRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleWare");

dotenv.config({ path: './config.env' });
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;
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

//error middleware
app.use(errorHandler);


//Routes Middleware
app.use("/api/user", UserRoute);

//routes
app.get('/', (_, res) => {
    res.send("Home page").status(200);
});

//port
const PORT = process.env.BACKEND_PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
