const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = 8001;

const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());


app.use("/api/users", require("./Routes/users"));



app.listen(PORT, (req, res) => {
    console.log(`The server has been started on ${PORT}`);
});