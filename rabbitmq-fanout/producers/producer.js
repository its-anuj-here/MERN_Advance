import amqp from 'amqplib';
import { RABBITMQ_URL, EXCHANGE } from '../config.js';

async function publishUserSignup(user) {
    try {
        const conn = await amqp.connect(RABBITMQ_URL);
        const ch = await conn.createChannel();

        await ch.assertExchange(EXCHANGE, 'fanout', { durable: true });

        const msgBuffer = Buffer.from(JSON.stringify(user));
        ch.publish(EXCHANGE, '', msgBuffer, { persistent: true });

        console.log(`Published signup: ${user.name}`);

        setTimeout(() => {
            ch.close();
            conn.close();
        }, 500);
    } catch (error) {
        console.error('Error publishing message:', error);
    }
}

// Example usage
const newUser = {  id: 101, name: 'John Doe', email: 'john.doe@example.com' };
publishUserSignup(newUser);