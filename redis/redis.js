// Import the redis library
const redis = require('redis');

// Create a Redis client
const client = redis.createClient({
    host: 'localhost', // Redis server host
    port: 6379,        // Redis server port
    // You can add more configuration options here if needed
});

// Event handler for Redis connection established
// const connection = 
    client.on('connect', () => {
        console.log('Connected to Redis');
    });
    // Event handler for Redis connection error
client.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
});


// Event handler for Redis connection error
client.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
});

// Example: Set a key-value pair in Redis
client.set('myKey', 'myValue', (error, reply) => {
    if (error) {
        console.error('Error setting key:', error);
    } else {
        console.log('Key set:', reply);
    }
});

// Example: Get the value for a key from Redis
client.get('myKey', (error, value) => {
    if (error) {
        console.error('Error getting value:', error);
    } else {
        console.log('Value for myKey:', value);
    }
});

module.exports = client;