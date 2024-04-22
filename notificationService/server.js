const express = require("express");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8005;
const cookieParser = require('cookie-parser')


const app = express();
const connectdb = require('./Config/connectiondb');
const { kafkaMessage } = require("./kafka/consumer");

//middleware
connectdb();
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());

async function startKafkaConsumer() {
    try {
        await kafkaMessage();
        console.log('Kafka consumer is running');
    } catch (error) {
        console.error('Error starting Kafka consumer:', error);
        process.exit(1); // Exit the process if Kafka consumer fails to start
    }
}

startKafkaConsumer();

app.get("/", (req, res) => {
    res.json("The NootificationService is up and running.");
});
app.use("/api/notification", require("./Routes/notification"));
app.use(express.json());
app.listen(PORT, (req, res) => {
    console.log(`The NotificationService has been started on ${PORT}`);
});