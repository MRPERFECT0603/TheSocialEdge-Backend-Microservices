const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "TheSocialEdge",
    brokers: ['localhost:9092'],

});

module.exports = { kafka };