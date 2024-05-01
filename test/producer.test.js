// Import the required modules
const { Kafka } = require('kafkajs');
const produceMessage = require('../path/to/producer'); // Adjust the path as per your directory structure

// Mock data for testing
const mockKafka = {
    producer: jest.fn(() => ({
        connect: jest.fn(),
        send: jest.fn(),
        disconnect: jest.fn()
    }))
};

jest.mock('kafkajs', () => ({
    Kafka: jest.fn(() => ({
        producer: jest.fn(() => mockKafka.producer())
    }))
}));

describe('Producer Tests', () => {
    test('should produce a message to Kafka successfully', async () => {
        // Mock the Kafka producer send and connect methods
        mockKafka.producer().send.mockResolvedValueOnce();
        mockKafka.producer().connect.mockResolvedValueOnce();

        // Call the produceMessage function
        await produceMessage();

        // Assertions
        expect(mockKafka.producer).toHaveBeenCalled();
        expect(mockKafka.producer().connect).toHaveBeenCalled();
        expect(mockKafka.producer().send).toHaveBeenCalledWith({
            topic: 'chats',
            messages: [{ value: 'Hello Kafka!' }]
        });
        expect(mockKafka.producer().disconnect).toHaveBeenCalled();
    });

    test('should handle errors while producing a message', async () => {
        // Mock the Kafka producer send and connect methods to throw an error
        mockKafka.producer().send.mockRejectedValueOnce(new Error('Kafka connection error'));
        mockKafka.producer().connect.mockResolvedValueOnce();

        // Call the produceMessage function
        await produceMessage();

        // Assertions
        expect(mockKafka.producer).toHaveBeenCalled();
        expect(mockKafka.producer().connect).toHaveBeenCalled();
        expect(mockKafka.producer().send).toHaveBeenCalledWith({
            topic: 'chats',
            messages: [{ value: 'Hello Kafka!' }]
        });
        expect(mockKafka.producer().disconnect).toHaveBeenCalled();
        // You can add more specific error handling assertions here
    });
});
