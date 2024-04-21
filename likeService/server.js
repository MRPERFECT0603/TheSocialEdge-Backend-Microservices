const express = require("express");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8001;
const cookieParser = require('cookie-parser')

const app = express();
const connectdb = require('./Config/connectiondb');

//middleware
connectdb();
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.json("The LikeService is up and running.");
});
app.use("/api/post/likes", require("./Routes/likes"));
app.use(express.json());
app.listen(PORT, (req, res) => {
    console.log(`The LikeService has been started on ${PORT}`);
});