import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { Kafka } from 'kafkajs';

const server = fastify({});

server.get('/ping', async function handler(request: FastifyRequest, reply: FastifyReply) {
    return 'pong';
});

const kafka = new Kafka({
    clientId: 'iot-manager',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'iot-ecosystem'});
await consumer.connect();
await consumer.subscribe({ topic: 'event-flow', fromBeginning: true});
await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log(message.value);
    }
})

server.listen({ port: 3000 });