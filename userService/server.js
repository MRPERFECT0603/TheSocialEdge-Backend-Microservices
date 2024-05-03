const express = require("express");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8001;
const cookieParser = require('cookie-parser')

const app = express();
const connectdb = require('./Config/connectiondb');

//middleware
connectdb();
app.use(cors({
    origin: ["http://localhost:30006"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.json("The UserService is up and running.");
});
app.use("/api/user", require("./Routes/users"));
app.use(express.json());
app.listen(PORT, (req, res) => {
    console.log(`The UserService has been started on ${PORT}`);
});