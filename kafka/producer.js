// producer.js

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-kafka-app',
    brokers: ['localhost:9092'] // Replace with your Kafka broker address
});

const producer = kafka.producer();

const produceMessage = async () => {
    try {
        await producer.connect();
        await producer.send({
            topic: 'chats',
            messages: [
                { value: 'Hello Kafka!' }
            ]
        });
        console.log('Message sent successfully!');
    } catch (error) {
        console.error('Error producing message:', error);
    } finally {
        await producer.disconnect();
    }
};

// produceMessage();
module.exports = produceMessage;
