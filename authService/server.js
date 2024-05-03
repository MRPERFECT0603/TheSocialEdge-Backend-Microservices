const express = require("express");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const cors = require("cors");

const app = express();
const connectdb = require('./Config/connectiondb');

//middleware
connectdb();
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cors({
    origin: ["http://localhost:30006"],
    credentials: true,
}));

app.get("/", (req, res) => {
    res.json("The AuthService is up and running.");
});
app.use("/api/auth", require("./Routes/auth"));

app.listen(PORT, (req, res) => {
    console.log(`The AuthService has been started on ${PORT}`);
});