const { kafka } = require("../kafka/client");

async function init() {
    const admin = kafka.admin();
    console.log("Admin Connecting....");
    await admin.connect(); 
    console.log("Admin Connected....");

    console.log("Creating Topics [InterProcessCommunication]");

    try {
        await admin.createTopics({
            topics: [
                {
                    topic: "likeUpdates",
                    numPartitions: 1,
                },
                {
                    topic: "commentUpdates",
                    numPartitions: 1,
                }
            ],
        });
        console.log("Topics Created [likeUpdates, commentUpdates]");
    } catch (error) {
        console.error("Error creating topics:", error); // Log the error details
    } finally {
        console.log("Disconnecting Admin");
        await admin.disconnect(); // Make sure to disconnect admin after operations
    }
}

init();
