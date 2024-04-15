const express = require("express");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;

const app = express();
const connectdb = require('./Config/connectiondb');

//middleware
connectdb();
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.use("/api/auth", require("./Routes/auth"));
app.use(express.json());
app.listen(PORT, (req, res) => {
    console.log(`The server has been started on ${PORT}`);
});