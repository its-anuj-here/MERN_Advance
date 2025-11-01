import amqp from 'amqplib';

import {RABBITMQ_URL, EXCHANGE, EMAIL_QUEUE} from "../config.js";

async function startEmailConsumer() {
    try {
        const conn = await amqp.connect(RABBITMQ_URL);
        const ch = await conn.createChannel();

        await ch.assertExchange(EXCHANGE, 'fanout', { durable: true });
        const q = await ch.assertQueue(EMAIL_QUEUE, { durable: true });
        await ch.bindQueue(q.queue, EXCHANGE, '');

        console.log('Email Consumer is waiting for messages...');
        ch.consume(q.queue, (msg) => {
            if (msg !== null) {
                const emailData = JSON.parse(msg.content.toString());
                console.log(`Email Consumer received: ${emailData.email}`);
                // Here add email processing logic
                ch.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error in Email Consumer:', error);
    }
}

startEmailConsumer();
