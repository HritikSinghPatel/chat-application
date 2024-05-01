// Import the required modules
const { Kafka } = require('kafkajs');
const consumeMessages = require('../path/to/consumer'); // Adjust the path as per your directory structure

// Mock data for testing
const mockKafka = {
    connect: jest.fn(),
    consumer: jest.fn(() => ({
        connect: jest.fn(),
        subscribe: jest.fn(),
        run: jest.fn()
    }))
};

jest.mock('kafkajs', () => ({
    Kafka: jest.fn(() => mockKafka)
}));

describe('Consumer Tests', () => {
    test('should consume messages from Kafka successfully', async () => {
        // Mock the Kafka consumer run method
        mockKafka.consumer().run.mockResolvedValueOnce();

        // Call the consumeMessages function
        await consumeMessages();

        // Assertions
        expect(mockKafka.connect).toHaveBeenCalled();
        expect(mockKafka.consumer).toHaveBeenCalledWith({ groupId: 'consume-1' });
        expect(mockKafka.consumer().connect).toHaveBeenCalled();
        expect(mockKafka.consumer().subscribe).toHaveBeenCalledWith({ topic: 'chats', fromBeginning: true });
        expect(mockKafka.consumer().run).toHaveBeenCalled();
    });

    test('should handle errors while consuming messages', async () => {
        // Mock the Kafka consumer run method to throw an error
        mockKafka.consumer().run.mockRejectedValueOnce(new Error('Kafka connection error'));

        // Call the consumeMessages function
        await consumeMessages();

        // Assertions
        expect(mockKafka.connect).toHaveBeenCalled();
        expect(mockKafka.consumer).toHaveBeenCalledWith({ groupId: 'consume-1' });
        expect(mockKafka.consumer().connect).toHaveBeenCalled();
        expect(mockKafka.consumer().subscribe).toHaveBeenCalledWith({ topic: 'chats', fromBeginning: true });
        expect(mockKafka.consumer().run).toHaveBeenCalled();
        // You can add more specific error handling assertions here
    });
});
