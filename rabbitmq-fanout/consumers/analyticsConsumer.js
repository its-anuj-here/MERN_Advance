import amqp from 'amqplib';

import {RABBITMQ_URL, EXCHANGE, ANALYTICS_QUEUE} from "../config.js";

async function startAnalyticalConsumer() {
    try {
        const conn = await amqp.connect(RABBITMQ_URL);
        const ch = await conn.createChannel();

        await ch.assertExchange(EXCHANGE, 'fanout', { durable: true });
        const q = await ch.assertQueue(ANALYTICS_QUEUE, {durable: true});
        await ch.bindQueue(q.queue, EXCHANGE, '');

        console.log('Analytics Consumer is waiting for messages...');
        ch.consume(q.queue, (msg) => {
            if (msg !== null) {
                const user = JSON.parse(msg.content.toString());
                console.log(`Log analytics: User ${user.name} signed up.`);                // Here you can add your analytics processing logic
                ch.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error in Analytics Consumer:', error);
    }
}

startAnalyticalConsumer();