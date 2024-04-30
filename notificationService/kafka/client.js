const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "TheSocialEdge",
    brokers: ['kafka-service:9092'],

});

module.exports = { kafka };