import { Kafka } from "kafkajs";

async function configureKafka() {
    const kafka = new Kafka({
        clientId: 'iot-manager',
        brokers: ['kafka:29092']
    });

    const consumer = kafka.consumer({ groupId: 'iot-ecosystem' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'factory-sensors-presence', fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Start some processing after read message
            console.log(message.value.toString());
        }
    })
}

export { configureKafka };