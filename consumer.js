const { Kafka } = require("kafkajs")
const msg = process.argv[2];
run();
async function run() {

    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })

        const consumer = kafka.consumer({groupId: "test1"});
        console.log("I am connecting....");
        await consumer.connect();
        console.log("I am connected!");

        consumer.subscribe({
            topic: "Users",
            fromBeginning: true
        })
        
        await consumer.run({
            eachMessage: async result => {
                console.log(`RECV MSG ${result.message.value} on partition ${result.partition}`)
            }
        })
    }

    catch (ex) {
        console.log(`something bad happened ${ex}`)
    }

    finally {

    }
}