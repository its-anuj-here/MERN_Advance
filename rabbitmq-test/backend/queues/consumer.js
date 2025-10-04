import amqp from 'amqplib';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey("your key here");

async function startConsumer() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL) ;
    const channel = await connection.createChannel();
    const queue = process.env.QUEUE_NAME || 'emailQueue';
    
    await channel.assertQueue(queue, {durable:true});
    console.log("Waiting for email task in queue: ", queue);

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            const email = JSON.parse(msg.content.toString());
            console.log("Processing email to:", email.to);
        
            try {
                await sgMail.send({
                    to: email.to,
                    from: "no-reply@example.com",
                    subject: email.subject,
                    text: email.text,
                });
                console.log("Email sent to:", email.to);
                channel.ack(msg);
            }catch (error) {
                console.error("Error sending email:", error);
            }
        }
    });
}

startConsumer();
