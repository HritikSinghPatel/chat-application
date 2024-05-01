// Import required modules
const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Event handler for WebSocket connections
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Event handler for receiving messages from clients
    ws.on('message', (message) => {
        console.log('Received message:', message);

        // Send a response back to the client
        ws.send('Received: ' + message);
    });

    // Event handler for WebSocket disconnections
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server listening on port 8080');
