const { kafka } = require("../kafka/client");
const axios = require("axios");


async function kafkaMessage() {
    const consumer = kafka.consumer({ groupId: 'likeUpdates' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'likeUpdates', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const { Email, name } = JSON.parse(message.value.toString());
            console.log('Email:', Email);
            console.log('Username:', name);
            // console.log({
            //     value: message.value.toString(),
            // })
            try {
                await axios.post("http://localhost:8005/api/notification", {
                    email: Email,
                    name: name
                });
            }
            catch (err) {
                console.log(err);
            }
        },
    })

}

module.exports = { kafkaMessage }


