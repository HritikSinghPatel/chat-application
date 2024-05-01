const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const consumer = require('./kafka/consumer');
const produceMessage = require('./kafka/producer');
const path = require("path");
// Import required modules
const http = require('http');
const WebSocket = require('ws');
// const redisClient = require('./redis/redis');

// Create an Express app
const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());

// Include authentication routes
app.use('/api', authRoutes);

app.use(express.static(path.resolve("./")))
app.get("/",(req,res) => {
    return (res.sendFile("./index.html"));
})

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket server event handlers
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Handle messages from clients
    ws.on('message', (message) => {
        console.log('Received message:', message);

        // Echo the message back to the client
        ws.send('Echo: ' + message);
    });

    // Handle WebSocket disconnections
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the HTTP server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    produceMessage();
    consumer();
});

// Define your other Express routes and middleware here


















// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());

// // Include authentication routes
// app.use('/api', authRoutes);

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     produceMessage();
//     consumer();
// });

// module.exports = app;
