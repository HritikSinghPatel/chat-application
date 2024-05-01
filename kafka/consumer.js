// consumer.js

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-kafka-app',
    brokers: ['localhost:9092'] // Replace with your Kafka broker address
});

const consumer = kafka.consumer({ groupId: 'consume-1' });

const consumeMessages = async () => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: 'chats', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    value: message.value.toString(),
                    offset: message.offset
                });
            }
        });
    } catch (error) {
        console.error('Error consuming messages:', error);
    }
};

// consumeMessages();
module.exports = consumeMessages;
