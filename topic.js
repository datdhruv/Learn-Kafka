const { Kafka } = require("kafkajs")
run();
async function run() {

    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })

        const admin = kafka.admin();
        console.log("I am connecting....");
        await admin.connect();
        console.log("I am connected!");
        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 1
            }]
        })
        console.log("Created successfully");
        await admin.disconnect();
    }

    catch (ex) {
        console.log(`something bad happened ${ex}`)
    }

    finally {
        process.exit(0);
    }
}