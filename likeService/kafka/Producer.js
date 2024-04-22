const { kafka } = require("./client");


//userEmail is of the person whose post it is.
//username is the name of the post liker.
async function sendNotification(userEmail, username) {

    console.log(userEmail, username);
    const producer = kafka.producer();

    console.log("Connecting Producer");
    await producer.connect();
    console.log("Producer Connected Successfully");

    await producer.send({
        topic: "likeUpdates",
        messages: [
            {
                value: JSON.stringify({ Email: userEmail, name: username }),
            },
        ],
    });

    console.log("MEssage Sent/...")

    // await producer.disconnect();

}


module.exports = { sendNotification }

