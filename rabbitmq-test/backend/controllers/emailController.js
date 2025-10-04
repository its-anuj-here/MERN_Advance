import amqp from 'amqplib';

export const sendEmailTask = async (req, res)=>{
    const {to, subject, text} = req.body;

    console.log("Received request for email sending to:", to);
    if(!to || !subject || !text){
        return res.status(400).json({message: 'Missing required fields'});
    }

    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = process.env.QUEUE_NAME || 'emailQueue';
        await channel.assertQueue(queue, {durable: true});

        const message = JSON.stringify({to, subject, text});
        channel.sendToQueue(queue, Buffer.from(message), {persistent: true});
        console.log("Enqueued email task:", message);

        setTimeout(() => {
            //channel.close();
            connection.close();
        }, 500);
        res.json({message: 'Email task enqueued successfully'});
    } catch (error) {
        console.error("Error enqueuing email task:", error);
        res.status(500).json({message: 'Internal server error'});
    }
};
