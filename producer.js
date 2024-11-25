const { Kafka } = require("kafkajs")
const msg = process.argv[2];
run();
async function run() {

    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })

        const producer = kafka.producer();
        console.log("I am connecting....");
        await producer.connect();
        console.log("I am connected!");

        // A-M 0, N-Z 1
        const partition = msg[0] < "N" ? 0 : 1;

        const result = await producer.send({
            "topic": "Users",
            "messages": [
                {
                    value: msg,
                    // partition: partition
                }
            ]
        })
        console.log(`Sent successfully ${JSON.stringify(result)}`);
        await producer.disconnect();
    }

    catch (ex) {
        console.log(`something bad happened ${ex}`)
    }

    finally {
        process.exit(0);
    }
}