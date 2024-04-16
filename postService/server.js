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

app.use("/api/posts", require("./Routes/posts"));
app.use(express.json());
app.listen(PORT, (req, res) => {
    console.log(`The server has been started on ${PORT}`);
});