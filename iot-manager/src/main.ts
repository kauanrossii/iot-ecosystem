import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { configureKafka } from './infrastructure/messaging';

const server = fastify({});

server.get('/ping', async function handler(request: FastifyRequest, reply: FastifyReply) {
    return 'pong';
});

server.listen({ port: 3000 }).then(async () => {
    await configureKafka();
});
